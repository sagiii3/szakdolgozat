import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';
import { UserService } from 'src/app/services/userService/user.service';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  public emailValue: string = '';

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  resetPassword(): void {
    this.userService.sendPasswordResetEmail(this.emailValue).then(() => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('successfull_password_reset'));
      this.router.navigate([GlobalVariables.LOGIN_ROUTE]);
    }).catch((error) => {
      this.snackbarService.snackbarError(this.translateService.instant('failed_password_reset'));
    });
  }

  navigateToPreviousPageAfterLogin(): void {
    this.router.navigate([this.userService.getPreviousLoginUrl()]);
  }

}
