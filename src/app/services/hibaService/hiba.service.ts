import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../snackbarService/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class HibaService {

  constructor(
    private snackbarService: SnackbarService
  ) { }
  private map = new Map()
    .set(600, "Sikeres feldolgozás!")
    .set(403, "Hozzáférés megtagadva!")
    .set(404, "Belső hiba történt!")
    .set(500, "Szerver hiba!")

    .set(0, "Ismeretlen hiba történt!");

  hibaKezeles(resp: any, egyeni?: boolean, error?: HttpErrorResponse): boolean {
    if (error) {
      let uzenet = this.map.has(error.status) ? this.map.get(error.status) : (error.status, error.statusText);
      this.snackbarService.snackbarError(uzenet);
      console.log(uzenet);
    }
    else {
      let szam = egyeni ? resp : resp.feldolgozasEredmenye.statuszKod;
      if (szam == 600) {
        this.snackbarService.snackbarSuccess(resp.feldolgozasEredmenye.statuszUzenet);
        return true;
      }
      let hibaUzenet = this.map.has(szam) ? this.map.get(szam) : resp.feldolgozasEredmenye.statuszUzenet;
      this.snackbarService.snackbarError(hibaUzenet);
    }
    return false;
  }

  setObservableDefaultPipe(obs: Observable<Response>): Observable<any> {
    return obs.pipe(
      tap(data => {
        if (environment.responseLog) {
          console.log(data);
        }
        this.errorLog(data)
      }),
      catchError(this.handleError)
    );
  }

  errorLog(resp: Response): void {
    console.log(resp)
    /*if (resp.feldolgozasEredmenye.statuszKod !== 600) {
      console.log(`Hiba a lekérésben, státusz kód: ${resp.feldolgozasEredmenye.statuszKod}, üzenet: ${resp.feldolgozasEredmenye.statuszUzenet}`);
    }*/
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Hiba történt: ${err.error.message}`;
    } else {
      errorMessage = `A szerver válasza: ${err.status}, üzenet: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }

}
