import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FelhasznaloService } from 'src/app/services/felhasznaloService/felhasznalo.service';
import { HibaService } from 'src/app/services/hibaService/hiba.service';
import { GlobalisValtozok } from 'src/app/shared/constants/globalisValtozok';
import { Felhasznalo } from 'src/app/shared/models/felhasznalo';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {//implements OnInit, OnDestroy{
  felhasznalo?: Felhasznalo;
  belepett?: boolean;

  globalisValtozok = GlobalisValtozok;

  @Input() isScreenSmall = false;
  @Input() isScreenSmall2 = false;
  @Output() toggleSidenav = new EventEmitter<void>();


  private profilSubscription?: Subscription;
  private toolbarUpdateSubscription?: Subscription;
  private ertesitesSubscription?: Subscription;
  private websocketSubscription?: Subscription;

  constructor(
    private felhasznaloService: FelhasznaloService,
    private hibaService: HibaService,
    private translateService: TranslateService,
    private snackbarService: SnackbarService,
    private router: Router){}
/*
  ngOnInit(): void {
    //this.belepett = this.felhasznaloService.isBejelentkezett();
    this.getToolbarUpdate();
    this.webSocketBejelentkezes();
    this.websocketErtesites();
  }

  getAdatok(): void{
    //this.belepett = this.felhasznaloService.isBejelentkezett();
  }

  getProfil(): void{
    if(this.belepett){
      const obs = this.felhasznaloService.getProfil();
      this.profilSubscription = this.hibaService.setObservableDefaultPipe(obs).subscribe({
        next: (resp) => {
          if(this.hibaService.hibaKezeles(resp) && resp.felhasznalo){
            this.felhasznalo = resp.felhasznalo;
            this.felhasznaloService.toolbarFrissites(resp.felhasznalo);
          }
        },
        error: (err) => {
            this.hibaService.hibaKezeles(undefined, undefined, err);
        }
      });
    }
    else{
      this.felhasznalo = new Felhasznalo();
    }
  }

  getToolbarUpdate(): void{
    this.toolbarUpdateSubscription = this.felhasznaloService.toolbarFrissitoObservable.subscribe({
      next: (resp) => {
        this.getAdatok();
        if(resp.felhasznaloNev.length <1){
          this.getProfil();
        }
        else{
          this.felhasznalo = resp;
        }
        if(this.belepett){
          this.getErtesitesDb();
        }
      },
      error: (err) => {
        this.hibaService.hibaKezeles(904, true);
      }
     })
  }

  openDialog(): void {
    this.felhasznaloService.setBejelentkezesElottiRoute(this.router.url);
    this.router.navigate([GlobalisValtozok.FELHASZNALO_BEJELENTKEZES_ROUTE]);
  }

  kilepes(): void {
    this.belepett = false;
    this.felhasznaloService.kijelentkezes(this.router.url);
    this.felhasznaloService.toolbarFrissites(new Felhasznalo());
    }
*/

  bejelentkezes(): void {
    this.felhasznaloService.setBejelentkezesElottiUrl(this.router.url);
    this.router.navigate([GlobalisValtozok.BEJELENTKEZES_ROUTE]);
  }

  kijelentkezes(): void{
    this.felhasznaloService.kijelentkezes().then(() => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('sikeres_kijelentkezes'));
    }).catch((error) => {
      this.snackbarService.snackbarError(this.translateService.instant('sikertelen_kijelentkezes'));
    });
  }

  ngOnDestroy(): void{
    this.profilSubscription?.unsubscribe();
    this.toolbarUpdateSubscription?.unsubscribe();
    this.ertesitesSubscription?.unsubscribe();
    this.websocketSubscription?.unsubscribe();
  }

}
