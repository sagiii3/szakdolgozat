import { Injectable } from '@angular/core';
import { SnackbarService } from '../snackbarService/snackbar.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private snackbarService: SnackbarService,
    private translateService: TranslateService
  ) { }

  errorLog(errorMessage: string, error?: Error): void {
    console.log(error);
    this.snackbarService.snackbarError(this.translateService.instant(errorMessage));
  }
}
