import { Component } from '@angular/core';
import { FelhasznaloService } from 'src/app/services/felhasznaloService/felhasznalo.service';
import { EmailAuthProvider, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.scss']
})
export class BejelentkezesComponent {

  constructor(
    private felhasznaloService: FelhasznaloService
  ) { }

  bejeletkezesEmail(): void {
    this.felhasznaloService.bejelentkezesEmaillel("teszt@gmail.com", "NagyonNehez123");
  }

  bejeletkezesGoogle(): void {
    this.felhasznaloService.bejelentkezesPopup(new GoogleAuthProvider());
  }

  bejeletkezesFacebook(): void {
    this.felhasznaloService.bejelentkezesPopup(new FacebookAuthProvider());
  }
}
