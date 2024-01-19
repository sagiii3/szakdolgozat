import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SnackbarService } from '../snackbarService/snackbar.service';
import { OwnHobby } from 'src/app/hobbies/models/ownHobby';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
/*
  public db?: IDBDatabase;

  constructor(
    private snackbarService: SnackbarService,
    private translateService: TranslateService) { }

  public addHobby(hobby: OwnHobby, objectStoreName: string, snackbarNelkul?: boolean){
    if(!this.db) {
      this.snackbarService.snackbarError('Az adatbázis még nincs betöltve!');
    }
    else{
      let objectStore = this.db.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
      let keres = objectStore.add(lego);

      keres.onerror = (e: any) => {
        if(snackbarNelkul) return;
        if (e.target.error.name === 'ConstraintError') {
          this.snackbarService.snackbarError(this.translateService.instant('ismetlo_termek'));
        } else {
          this.snackbarService.snackbarError('Hiba a hozzáadás közben: ' + e.target.error);
        }
      }

      keres.onsuccess = (e: any) => {
        this.loadLegoKedvencek(objectStoreName);
        if(snackbarNelkul) return;
        this.snackbarService.snackbarSuccess('Sikeres hozzáadás!');
      }
    }
  }

  public removeLegoKocka(id: string, objectStoreName: string){
    if(!this.db) {
      this.snackbarService.snackbarError('Az adatbázis még nincs betöltve!');
      return;
    }

    let objectStore = this.db.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
    let keres = objectStore.delete(id);

    keres.onerror = (e: any) => {
      this.snackbarService.snackbarError('Hiba a törlés közben: ' + e.target.error);
    }

    keres.onsuccess = (e: any) => {
      this.snackbarService.snackbarSuccess('Sikeres törlés!');
      this.loadLegoKedvencek(objectStoreName);
    }
  }



 public loadLegoKedvencek(objectStoreName: string): Observable<LegoKocka[]> {
  //várjuk meg amíg a konstruktor lefut és inicializálódik az adatbázis
  setTimeout(() => {}, 3000);
  if(!this.db) {
    this.snackbarService.snackbarError('Az adatbázis még nincs betöltve!');
    return new Observable<LegoKocka[]>();
  }
  else{
    let objectStore = this.db.transaction(objectStoreName).objectStore(objectStoreName);
    return new Observable<LegoKocka[]>(subscriber => {
      let legok: LegoKocka[] = [];

      objectStore.openCursor().onsuccess = (e: any) => {
        const cursor = e.target.result;
        if(cursor) {
          legok.push(cursor.value);
          cursor.continue();
        } else {
          subscriber.next(legok);
        }
      };
    });
    }
 }*/
} 
