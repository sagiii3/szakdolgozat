import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { FelhasznaloService } from 'src/app/services/felhasznaloService/felhasznalo.service';
import { HibaService } from 'src/app/services/hibaService/hiba.service';
import { GlobalisValtozok } from 'src/app/shared/constants/globalisValtozok';

const SMALL_WIDTH_BREAKPOINT = 500;
const SMALL_WIDTH_BREAKPOINT2 = 850;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{
  isDarkTheme: boolean = false;
  belepett?: boolean;
  azonosito? : string;
  admin?: boolean;
  vezeto?: boolean;

  globalisValtozok = GlobalisValtozok;

  isScreenSmall: boolean = false;
  isScreenSmall2: boolean = false;

  private breakpointObserverSubscription?: Subscription;
  private breakpointObserverSubscription2?: Subscription;
  private navbarFrissitesSubscription?: Subscription;

  constructor(
    private felhasznaloService: FelhasznaloService,
    private hibaService: HibaService,
    private breakpointObserver: BreakpointObserver){}

  ngOnInit(): void {
    this.getNavbarUpdate();
    this.getAdatok();
  }


  getNavbarUpdate(): void{
    /*this.navbarFrissitesSubscription = this.felhasznaloService.navbarFrissitoObservable.subscribe({
      next: (resp) => {
        this.getAdatok();
      },
      error: (err) => {
        this.hibaService.hibaKezeles(905, true);
      }
     });*/
    }

  getAdatok(){
    /*this.belepett = this.felhasznaloService.isBejelentkezett();
    this.admin = this.felhasznaloService.isAdmin();
    this.vezeto = this.felhasznaloService.isVezeto();
    this.azonosito = this.belepett ? this.felhasznaloService.getBejelentkezettFelhasznaloId() : undefined;
    */
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


  ngOnDestroy(): void{
    this.breakpointObserverSubscription?.unsubscribe();
    this.breakpointObserverSubscription2?.unsubscribe();
    this.navbarFrissitesSubscription?.unsubscribe();
  }
}
