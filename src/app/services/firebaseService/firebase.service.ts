import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, FirestoreDataConverter, getDocs } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Observable, map, from } from 'rxjs';
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

  async addToCollection(collectionName: string, document: any, successMessage: string, failedMessage: string, _class: any): Promise<void> {
    const converter = this.createFirestoreDataConverter(_class);
    if(document.id){
      let customCollection = doc(this.firestore, collectionName, document.id);
      await setDoc(customCollection.withConverter(converter), document).then(
        () => this.snackbarService.snackbarSuccess(this.translateService.instant(successMessage))
      ).catch(
        (error) => {
          error.code == 'permission-denied' ?
          this.errorService.errorLog(error) : 
          this.snackbarService.snackbarError(this.translateService.instant(failedMessage)
        )}
      );
    }
    else{
      let customCollection = collection(this.firestore, collectionName);
      await addDoc(customCollection.withConverter(converter), document).then(
        () => this.snackbarService.snackbarSuccess(this.translateService.instant(successMessage))
      ).catch(
        (error) => {
          error.code == 'permission-denied' ?
          this.errorService.errorLog(error) : 
          this.snackbarService.snackbarError(this.translateService.instant(failedMessage)
        )}
      );
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
}
