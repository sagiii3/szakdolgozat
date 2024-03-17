import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userService/user.service';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { ErrorService } from '../errorService/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService) {}

  canActivate() {
    this.userService.isAuthenticated()
      .subscribe((res) => {
        if (res) {
          return true;
        } else {
          this.errorService.errorLog('auth_required');
          this.router.navigate([GlobalVariables.ROUTES.home]);
          return false;
        }
      }
      );
  }
}
