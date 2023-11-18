import { Component } from '@angular/core';
import { FelhasznaloService } from 'src/app/services/felhasznaloService/felhasznalo.service';
import { GoogleAuthProvider } from  '@angular/fire/auth';
import { BejelentkezoFelhasznalo } from '../../models/bejelentkezo-felhasznalo';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalisValtozok } from 'src/app/shared/constants/globalisValtozok';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.scss']
})
export class BejelentkezesComponent {

  bejelentkezoFelhasznalo: BejelentkezoFelhasznalo = new BejelentkezoFelhasznalo();
  jelszoElrejtes: boolean = true;
  globalisValtozok = GlobalisValtozok;

  constructor(
    private felhasznaloService: FelhasznaloService,
    private router: Router,
    private snackbarService: SnackbarService,
    private translateService: TranslateService
  ) { }

  bejelentkezes(formName: any) {
    if (!formName.form.valid) {
      //helytelenül kitöltött űrlapra hibakezelés
    } else {
      this.bejeletkezesEmail();
    }
  }

  bejeletkezesEmail(): void {
    //"teszt@gmail.com", "NagyonNehez123"
    this.felhasznaloService.bejelentkezesEmaillel(this.bejelentkezoFelhasznalo.email, this.bejelentkezoFelhasznalo.jelszo).then(cred => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('sikeres_bejelentkezes'));
      this.navigacioBejelentkezesElottiOldalra();
    }).catch((error) => {
      this.snackbarService.snackbarError(this.translateService.instant('sikertelen_bejelentkezes'));
    });
  }

  bejeletkezesGoogle(): void {
    this.felhasznaloService.bejelentkezesPopup(new GoogleAuthProvider()).then(cred => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('sikeres_bejelentkezes'));
      this.navigacioBejelentkezesElottiOldalra();
    }).catch((error) => {		
      console.log(error.code)
      console.log(error.message)
      this.snackbarService.snackbarError(this.translateService.instant('sikertelen_bejelentkezes'));
    });
  }

  elfelejtettJelszo(): void {
    //TODO: jelszó visszaállítás
    this.felhasznaloService.kuldjUjJelszoVisszaallitoEmailt(this.bejelentkezoFelhasznalo.email).then(() => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('sikeres_jelszo_visszaallitas'));
    }).catch((error) => {
      this.snackbarService.snackbarError(this.translateService.instant('sikertelen_jelszo_visszaallitas'));
    });
  }

  navigacioBejelentkezesElottiOldalra(): void {
    this.router.navigate([this.felhasznaloService.getBejelentkezesElottiUrl()]);
  }
}
