import { Injectable } from '@angular/core';
import { SnackbarService } from '../snackbarService/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private snackbarService: SnackbarService
  ) { }

  errorLog(error: any): void {
    console.log(error);
    this.snackbarService.snackbarError(error);
  }
}
