import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, FirestoreDataConverter, getDocs } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { Observable, map, from, filter } from 'rxjs';
import { ErrorService } from '../errorService/error.service';
import { SnackbarService } from '../snackbarService/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    protected firestore: Firestore,
    protected snackbarService: SnackbarService,
    protected translateService: TranslateService,
    protected errorService: ErrorService) { }

  createFirestoreDataConverter<T>(osztaly: { new(...args: any[]): T }): FirestoreDataConverter<T> {
    return {
      toFirestore: (data: T) => { 
        const result: Record<string, any> = {};
        Object.keys(data as object).forEach((key) => {
            result[key] = (data as any)[key];
        });
        return result;
      },
      fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new osztaly(
          ...Object.keys(data).map((key) => data[key])
        );
      }
    };
  }

  removeUndefinedFields(obj: any): any {
    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  async addToCollection(collectionName: string, document: any, successMessage: string, failedMessage: string, _class: any): Promise<boolean> {
    const converter = this.createFirestoreDataConverter(_class);
    document = this.removeUndefinedFields(document);
    try {
      if (document.id) {
        const customCollection = doc(this.firestore, collectionName, document.id);
        await setDoc(customCollection.withConverter(converter), document);
        this.snackbarService.snackbarSuccess(this.translateService.instant(successMessage));
        return true;
      } else {
        const customCollection = collection(this.firestore, collectionName);
        await addDoc(customCollection.withConverter(converter), document);
        this.snackbarService.snackbarSuccess(this.translateService.instant(successMessage));
        return true;
      }
    } catch (error: any) {
      const message = error.code === 'permission-denied' ? 'permission-denied' : failedMessage;
      this.snackbarService.snackbarError(this.translateService.instant(message));
      return false;
    }
  }

  async removeFromCollection(collectionNeve: string, id: string): Promise<void> {
    const docRef = doc(this.firestore, collectionNeve, id);
    deleteDoc(docRef);
    try {
      await deleteDoc(docRef);
      this.snackbarService.snackbarSuccess(this.translateService.instant('successful_delete'));
    } catch (error) {
      this.snackbarService.snackbarError(this.translateService.instant('failed_delete'));
    }
  }

  getCollectionList(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    let data: any[] = [];
    return from(getDocs(collectionRef)).pipe(
      map((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
    );
  }

  getDocument(collectionName: string, id: string): Observable<any> {
    const docRef = doc(this.firestore, collectionName, id);
    return from(getDoc(docRef)).pipe(
      map((doc) => {
        if (doc.exists()) {
          return doc.data();
        } else {
          return undefined;
        }
      })
    );
  }

}
