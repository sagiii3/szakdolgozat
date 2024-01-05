import { Component } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { LoginUser } from '../../models/login-user';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginUser: LoginUser = new LoginUser();
  hidePassword: boolean = true;
  globalVariables = GlobalVariables;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private translateService: TranslateService
  ) { }

  login(formName: any) {
    if (!formName.form.valid) {
      // Kezelés, ha az űrlap helytelenül van kitöltve
    } else {
      this.loginWithEmail();
    }
  }

  loginWithEmail(): void {
    this.userService.loginWithEmail(this.loginUser.email, this.loginUser.password).then(cred => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('successfull_login'));
      this.navigateToPreviousPageAfterLogin();
    }).catch((error) => {
      this.snackbarService.snackbarError(this.translateService.instant('failed_login'));
    });
  }

  loginWithGoogle(): void {
    this.userService.loginWithPopup(new GoogleAuthProvider()).then(cred => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('successfull_login'));
      this.navigateToPreviousPageAfterLogin();
    }).catch((error) => {		
      console.log(error.code)
      console.log(error.message)
      this.snackbarService.snackbarError(this.translateService.instant('failed_login'));
    });
  }
  
  navigateToPreviousPageAfterLogin(): void {
    this.router.navigate([this.userService.getPreviousLoginUrl()]);
  }
}
