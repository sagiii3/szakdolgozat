import { Component } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { LoginUser } from '../../models/login-user';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { User } from 'src/app/shared/models/user';
import { ErrorService } from 'src/app/services/errorService/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginUser: LoginUser = new LoginUser();
  hidePassword: boolean = true;
  user: User = new User();
  globalVariables = GlobalVariables;

  constructor(
    protected userService: UserService,
    private snackbarService: SnackbarService,
    private translateService: TranslateService,
    private errorService: ErrorService
  ) { }

  login(formName: any) {
    if (!formName.form.valid) {
      this.errorService.errorLog("invalid_form");
    } else {
      this.loginWithEmail();
    }
  }

  loginWithEmail(): void {
    this.userService.loginWithEmail(this.loginUser.email, this.loginUser.password).then(cred => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('successful_login'));
      this.userService.navigateToPreviousPageAfterLogin();
    }).catch((error: Error) => {
      this.errorService.errorLog("failed_login", error);
    });
  }

  loginWithGoogle(): void {
    this.userService.loginWithPopup(new GoogleAuthProvider()).then(cred => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('successful_login'));
      this.userService.saveUser(this.userService.getCurrentUser());
      this.userService.navigateToPreviousPageAfterLogin();
    }).catch((error: Error) => {		
      this.errorService.errorLog("failed_login", error);
    });
  }
}
