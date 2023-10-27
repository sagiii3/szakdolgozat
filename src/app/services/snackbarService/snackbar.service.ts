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

  snackbarSuccess(uzenet: string) {
    this.openSnackbar(GlobalisValtozok.SNACKBAR_SUCCESS, uzenet);
  }

  snackbarError(uzenet: string) {
    this.openSnackbar(GlobalisValtozok.SNACKBAR_ERROR, uzenet);
  }

  snackbarWarning(uzenet: string) {
    this.openSnackbar(GlobalisValtozok.SNACKBAR_WARNING, uzenet);
  }

  snackbarInfo(uzenet: string) {
    this.openSnackbar(GlobalisValtozok.SNACKBAR_INFO, uzenet);
  }

  openSnackbar(snackbarTipus: string, uzenet: string) {
    let message: string = uzenet;
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
