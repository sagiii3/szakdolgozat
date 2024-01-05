import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';

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

  private breakpointObserverSubscription?: Subscription;
  private breakpointObserverSubscription2?: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getBreakPoints();
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
