import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/userService/user.service';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { User } from 'src/app/shared/models/user';
import { ErrorService } from 'src/app/services/errorService/error.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  globalVariables = GlobalVariables;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  user: User = new User();

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private translateService: TranslateService,
    private errorService: ErrorService
  ) {}

  signupWithEmail(formName: any): void {
    if (!formName.form.valid) {
      this.errorService.errorLog('invalid_form');
    } else {
      let email = formName.form.value.email;
      let password = formName.form.value.password;
      this.userService.signupWithEmail(email, password).then(cred => {
        this.snackbarService.snackbarSuccess(this.translateService.instant('successful_signup'));
        this.userService.saveUser(this.user).then((result) => result ?
          this.snackbarService.snackbarSuccess(this.translateService.instant('successful_user_save')) :
          this.errorService.errorLog('failed_user_save')).catch(
            (error: Error) => {
            this.errorService.errorLog('failed_user_save', error);
          });
        this.userService.navigateToPreviousPageAfterLogin();
      }).catch((error) => {
        this.errorService.errorLog('failed_signup', error);
      });
    }
  }
}
