import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FelhasznaloService } from 'src/app/services/felhasznaloService/felhasznalo.service';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';
import { GlobalisValtozok } from 'src/app/shared/constants/globalisValtozok';
import { Felhasznalo } from 'src/app/shared/models/felhasznalo';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.scss']
})
export class RegisztracioComponent {
  globalisValtozok = GlobalisValtozok;
  jelszoElrejtes: boolean = true;
  ismetloJelszoElrejtes: boolean = true;


  felhasznalo: Felhasznalo = new Felhasznalo();

  constructor(
    private felhasznaloService: FelhasznaloService,
    private snackbarService: SnackbarService,
    private translateService: TranslateService
  ) { }

  regisztracio(formName: any) {
    if (!formName.form.valid) {
      //helytelenül kitöltött űrlapra hibakezelés
    } else {
      this.regisztracioEmaillel(formName.form.email, formName.form.jelszo);
    }
  }

  regisztracioEmaillel(email: string, password: string): void {
    this.felhasznaloService.regisztracioEmaillel(email, password).then(cred => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('sikeres_regisztracio'));
      //itt bejelentkezés
    }).catch((error) => {
      this.snackbarService.snackbarError(this.translateService.instant('sikertelen_regisztracio'));
    });
  }
}
