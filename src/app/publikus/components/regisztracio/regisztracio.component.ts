import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FelhasznaloService } from 'src/app/services/felhasznaloService/felhasznalo.service';
import { SnackbarService } from 'src/app/services/snackbarService/snackbar.service';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.scss']
})
export class RegisztracioComponent {

  constructor(
    private felhasznaloService: FelhasznaloService,
    private snackbarService: SnackbarService,
    private translateService: TranslateService
  ) { }

  regisztracioEmaillel(email: string, password: string): void {
    this.felhasznaloService.regisztracioEmaillel(email, password).then(cred => {
      this.snackbarService.snackbarSuccess(this.translateService.instant('sikeres_regisztracio'));
      //itt bejelentkezés
    }).catch((error) => {
      this.snackbarService.snackbarError(this.translateService.instant('sikertelen_regisztracio'));
    });
  }
}
