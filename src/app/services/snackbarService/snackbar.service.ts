import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalisValtozok } from 'src/app/shared/constants/globalisValtozok';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(
    private snackBar: MatSnackBar) { }

  private snackbarDurationSeconds = 3;

  snackbarSuccess(uzenet: string, uzenetLista?: []) {
    this.openSnackbar(GlobalisValtozok.SNACKBAR_SUCCESS, uzenet, uzenetLista);
  }

  snackbarError(uzenet: string, uzenetLista?: []) {
    this.openSnackbar(GlobalisValtozok.SNACKBAR_ERROR, uzenet, uzenetLista);
  }

  snackbarWarning(uzenet: string, uzenetLista?: []) {
    this.openSnackbar(GlobalisValtozok.SNACKBAR_WARNING, uzenet, uzenetLista);
  }

  snackbarInfo(uzenet: string, uzenetLista?: []) {
    this.openSnackbar(GlobalisValtozok.SNACKBAR_INFO, uzenet, uzenetLista);
  }

  openSnackbar(snackbarTipus: string, uzenet: string, uzenetLista?: []) {
    let message: string = uzenet;
    if (uzenetLista != undefined) {
      for (let i of uzenetLista) {
        message += i + "\n";
      }
    }
    switch (snackbarTipus) {
      case GlobalisValtozok.SNACKBAR_SUCCESS:
        this.selectSnackbarTipus(message, GlobalisValtozok.SUCCESS_SNACKBAR);
        break;
      case GlobalisValtozok.SNACKBAR_INFO:
        this.selectSnackbarTipus(message, GlobalisValtozok.INFO_SNACKBAR);
        break;
      case GlobalisValtozok.SNACKBAR_WARNING:
        this.selectSnackbarTipus(message, GlobalisValtozok.WARNING_SNACKBAR);
        break;
      case GlobalisValtozok.SNACKBAR_ERROR:
        this.selectSnackbarTipus(message, GlobalisValtozok.ERROR_SNACKBAR);
        break;
    }
  }

  selectSnackbarTipus(message: string, szin: string) {
    this.snackBar.open(message, GlobalisValtozok.MEGERTETTEM, {
      duration: this.snackbarDurationSeconds * 1000,
      panelClass: [szin]
    });
  }

}
