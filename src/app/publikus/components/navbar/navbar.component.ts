import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { UserService } from 'src/app/services/userService/user.service';
import { ErrorService } from 'src/app/services/errorService/error.service';

const SMALL_WIDTH_BREAKPOINT = 500;
const SMALL_WIDTH_BREAKPOINT2 = 850;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  globalVariables = GlobalVariables;

  isScreenSmall: boolean = false;
  isScreenSmall2: boolean = false;

  isLoggedIn: boolean = false;

  private breakpointObserverSubscription?: Subscription;
  private breakpointObserverSubscription2?: Subscription;
  private isAuthSubscription?: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private errorService: ErrorService
    ) { }

  ngOnInit(): void {
    this.getBreakPoints();
    this.isLoggedInSubscriber();
  }

  isLoggedInSubscriber(): void {
    this.isAuthSubscription = this.userService.isAuthenticated().subscribe({
      next: (user) => {
      this.isLoggedIn = user ? true : false;
      },
      error: (error: Error) => {
        this.errorService.errorLog("is_authenticated_error", error);
      }
    });
  }


  private getBreakPoints(): void {
    this.breakpointObserverSubscription = this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
    this.breakpointObserverSubscription2 = this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT2}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall2 = state.matches;
      });
  }


  ngOnDestroy(): void {
    this.breakpointObserverSubscription?.unsubscribe();
    this.breakpointObserverSubscription2?.unsubscribe();
  }
}
