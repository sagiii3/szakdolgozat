import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService) { }

  private snackbarDurationSeconds = 3;

  snackbarSuccess(uzenet: string) {
    this.openSnackbar(GlobalVariables.SNACKBAR_SUCCESS, uzenet);
  }

  snackbarError(uzenet: string) {
    this.openSnackbar(GlobalVariables.SNACKBAR_ERROR, uzenet);
  }

  snackbarWarning(uzenet: string) {
    this.openSnackbar(GlobalVariables.SNACKBAR_WARNING, uzenet);
  }

  snackbarInfo(uzenet: string) {
    this.openSnackbar(GlobalVariables.SNACKBAR_INFO, uzenet);
  }

  openSnackbar(snackbarTipus: string, uzenet: string) {
    let message: string = uzenet;
    switch (snackbarTipus) {
      case GlobalVariables.SNACKBAR_SUCCESS:
        this.selectSnackbarTipus(message, GlobalVariables.SUCCESS_SNACKBAR);
        break;
      case GlobalVariables.SNACKBAR_INFO:
        this.selectSnackbarTipus(message, GlobalVariables.INFO_SNACKBAR);
        break;
      case GlobalVariables.SNACKBAR_WARNING:
        this.selectSnackbarTipus(message, GlobalVariables.WARNING_SNACKBAR);
        break;
      case GlobalVariables.SNACKBAR_ERROR:
        this.selectSnackbarTipus(message, GlobalVariables.ERROR_SNACKBAR);
        break;
    }
  }

  selectSnackbarTipus(message: string, szin: string) {
    this.snackBar.open(message, this.translateService.instant('understood'), {
      duration: this.snackbarDurationSeconds * 1000,
      panelClass: [szin]
    });
  }

}
