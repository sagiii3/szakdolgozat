import { Component } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/userService/user.service';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { User } from 'src/app/shared/models/user';

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
    private router: Router
  ) { }

  signupWithEmail(formName: any): void {
    if (!formName.form.valid) {
      // Handle incorrectly filled form
    } else {
      let email = formName.form.value.email;
      let password = formName.form.value.password;
      this.userService.signupWithEmail(email, password).then(cred => {
        this.snackbarService.snackbarSuccess(this.translateService.instant('successful_signup'));
        this.navigateToLoginPreviousPage();
      }).catch((error) => {
        this.snackbarService.snackbarError(this.translateService.instant('failed_signup'));
      });
    }
  }

  signupWithGoogle(): void {
    this.userService.loginWithPopup(new GoogleAuthProvider()).then(cred => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('successful_login'));
      this.navigateToLoginPreviousPage();
    }).catch((error) => {
      console.log(error.code);
      console.log(error.message);
      this.snackbarService.snackbarError(this.translateService.instant('failed_login'));
    });
  }

  navigateToLoginPreviousPage(): void {
    this.router.navigate([this.userService.getPreviousLoginUrl()]);
  }
}
