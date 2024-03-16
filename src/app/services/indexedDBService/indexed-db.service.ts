import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SnackbarService } from '../snackbarService/snackbar.service';
import { OwnHobby } from 'src/app/hobbies/models/ownHobby';
import { ErrorService } from '../errorService/error.service';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  public db?: IDBDatabase;

  constructor(
    private snackbarService: SnackbarService,
    private translateService: TranslateService,
    private errorService: ErrorService
  ) { }

  public addHobby(hobby: OwnHobby, objectStoreName: string, withoutMessage?: boolean) {
    if (!this.db) {
      this.errorService.errorLog('db_not_loaded');
    }
    else {
      let objectStore = this.db.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
      let request = objectStore.add(hobby);

      request.onerror = (error: any) => {
        if (withoutMessage) return;
        if (error.target.error.name === 'ConstraintError') {
          this.errorService.errorLog('repeated_hobby');
        } else {
          this.errorService.errorLog('add_hobby_error_idb', error.target.error);
        }
      }

      request.onsuccess = (e: any) => {
        if (withoutMessage) return;
        this.snackbarService.snackbarSuccess(this.translateService.instant('hobby_added_idb'));
      }
    }
  }

  public deleteDBData(objectStoreName: string) {
    if (!this.db) {
      this.errorService.errorLog('db_not_loaded');
      return;
    }

    let objectStore = this.db.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
    let request = objectStore.clear();

    request.onerror = (e: any) => {
      this.errorService.errorLog('delete_db_data_error', e.target.error);
    }

    request.onsuccess = (e: any) => {
      console.log(this.translateService.instant('db_data_deleted'));
    }
  }




  public removeHobby(id: string, objectStoreName: string) {
    if (!this.db) {
      this.errorService.errorLog('db_not_loaded');
      return;
    }

    let objectStore = this.db.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
    let request = objectStore.delete(id);

    request.onerror = (e: any) => {
      this.errorService.errorLog('hobby_deleted_idb', e.target.error);
    }

    request.onsuccess = (e: any) => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('hobby_deleted_idb'));
      this.loadHobbies(objectStoreName);
    }
  }



  public loadHobbies(objectStoreName: string): Observable<OwnHobby[]> {
    //várjuk meg amíg a konstruktor lefut és inicializálódik az adatbázis
    setTimeout(() => { }, 5000);
    if (!this.db) {
      this.errorService.errorLog('db_not_loaded');
      return new Observable<OwnHobby[]>();
    }
    else {
      let objectStore = this.db.transaction(objectStoreName).objectStore(objectStoreName);
      return new Observable<OwnHobby[]>(subscriber => {
        let hobbyList: OwnHobby[] = [];

        objectStore.openCursor().onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            hobbyList.push(cursor.value);
            cursor.continue();
          } else {
            subscriber.next(hobbyList);
          }
        };
      });
    }
  }
} 
