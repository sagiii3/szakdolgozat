import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from './services/snackbarService/snackbar.service';
import { GlobalVariables } from './shared/constants/globalVariables';
import { ErrorService } from './services/errorService/error.service';
import { IndexedDBService } from './services/indexedDBService/indexed-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'szakdolgozat-alkalmazas';
  constructor(
    private translate: TranslateService,
    private swUpdate: SwUpdate,
    private errorService: ErrorService,
    private indexedDBService: IndexedDBService
    ) {
    translate.addLangs(['hu'])
    translate.setDefaultLang('hu');
    translate.use('hu');

    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(data => {
        if (data) {
          alert(this.translate.instant('update_downloaded'));
          window.location.reload();
        }
      });
    }
    this.initIndexedDB();
  }

  private initIndexedDB(): void {
    const openRequest = indexedDB.open('hobbyJournal', 1);

    openRequest.onerror = (e: any) => {
      this.errorService.errorLog('error_db_open', e.target.error);
    };

    openRequest.onupgradeneeded = (e: any) => {
      this.indexedDBService.db = e.target.result  as IDBDatabase;
      this.createObjectStore(this.indexedDBService.db, GlobalVariables.DB_STORE_NAMES.hobbies);
      this.createObjectStore(this.indexedDBService.db, GlobalVariables.DB_STORE_NAMES.ownHobbies);
      this.createObjectStore(this.indexedDBService.db, GlobalVariables.DB_STORE_NAMES.categories);
    };

    openRequest.onsuccess = (e: any) => {
      this.indexedDBService.db = e.target.result as IDBDatabase;
    };
  }



    createObjectStore(db: IDBDatabase, objectStoreName: string): void {
      if (!db.objectStoreNames.contains(objectStoreName)) {
        db.createObjectStore(objectStoreName, { keyPath: 'id'});
      }
    }
}
