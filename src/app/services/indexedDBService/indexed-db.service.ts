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

  async waitForInitialization(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkInitialized = () => {
        if (this.db) {
          resolve();
        } else {
          setTimeout(checkInitialized, 100); // Check every 100ms
        }
      };
      checkInitialized();
    });
  }

  async addElement(element: any, objectStoreName: string, withoutMessage?: boolean) {
    await this.waitForInitialization();
    let objectStore = this.db!.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
    let request = objectStore.add(element);

    request.onerror = (error: any) => {
      if (withoutMessage) return;
      if (error.target.error.name === 'ConstraintError') {
        this.errorService.errorLog('repeated_element');
      } else {
        this.errorService.errorLog('add_element_error_idb', error.target.error);
      }
    }

    request.onsuccess = (e: any) => {
      if (withoutMessage) return;
      this.snackbarService.snackbarSuccess(this.translateService.instant('element_added_idb'));
    }
  }

  async updateElement(objectStoreName: string, element: any) {
    await this.waitForInitialization();
    let objectStore = this.db!.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);

    let request = objectStore.put(element);

    request.onerror = (e: any) => {
      this.errorService.errorLog('update_element_error_idb', e.target.error);
    }

    request.onsuccess = (e: any) => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('element_updated_idb'));
    }
  }


  async deleteDBData(objectStoreName: string) {
    await this.waitForInitialization();

    let objectStore = this.db!.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
    let request = objectStore.clear();

    request.onerror = (e: any) => {
      this.errorService.errorLog('delete_db_data_error', e.target.error);
    }

    request.onsuccess = (e: any) => {
      console.log(this.translateService.instant('db_data_deleted'));
    }
  }

  async getElementById(id: string, objectStoreName: string) {
    await this.waitForInitialization();
    let objectStore = this.db!.transaction(objectStoreName).objectStore(objectStoreName);
    return new Observable<any>(subscriber => {
      const request = objectStore.get(id);
      request.onsuccess = (e: any) => {
        subscriber.next(request.result);
      }
    });
    
  }




  public async loadCollection(objectStoreName: string, filterId?: string) {
    await this.waitForInitialization();
    let objectStore = this.db!.transaction(objectStoreName).objectStore(objectStoreName);
    return new Observable<any[]>(subscriber => {
      let dataList: any[] = [];

      objectStore.openCursor().onsuccess = (e: any) => {
        const cursor = e.target.result;
        if (cursor) {
          if (filterId) {
            if (cursor.value.categoryIds.includes(filterId)) {
              dataList.push(cursor.value);
            }
          }
          else {
            dataList.push(cursor.value);
          }
          cursor.continue();
        } else {
          subscriber.next(dataList);
        }
      };
    });
  }
} 
