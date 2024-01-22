import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { User } from 'src/app/shared/models/user';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  user?: User;
  isLoggedIn?: boolean;
  langChange: boolean = true;

  globalVariables = GlobalVariables;

  @Input() isScreenSmall = false;
  @Input() isScreenSmall2 = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  authSubscription?: Subscription;
  userSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private translateService: TranslateService,
    private snackbarService: SnackbarService,
    private router: Router
  ){ }
  

  ngOnInit(): void {
    this.authSubscription = this.userService.isAuthenticated().subscribe({
      next: (response) => {
        this.isLoggedIn = response;
        if (this.isLoggedIn) {
          this.userSubscription = this.userService.getUser().subscribe({
            next: (user) => {
              this.user = user;
            },
            error: (error: Error) => {
              this.errorService.errorLog('get_user_error', error);
            }
          });
        }
      },
      error: (error: Error) => {
        this.errorService.errorLog('is_authenticated_error', error);
      }
    });
  }

  login(): void {
    this.userService.setPreviousLoginUrl(this.router.url);
    this.router.navigate([GlobalVariables.ROUTES.login]);
  }

  logout(): void {
    this.userService.logout().then(() => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('successful_logout'));
      this.user = undefined;
      this.isLoggedIn = false;
      this.router.navigate([GlobalVariables.ROUTES.home]);
    }).catch((error: Error) => {
      this.errorService.errorLog("failed_login", error);
    });
  }

  changeLanguage(): void {
    let lang = this.langChange ? 'en' : 'hu';
    this.translateService.addLangs([lang])
    this.translateService.use(lang);
    this.langChange = !this.langChange;
    let currentRoute = window.location.pathname;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });    
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}
