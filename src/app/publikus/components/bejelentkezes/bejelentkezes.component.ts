import { Component } from '@angular/core';
import { FelhasznaloService } from 'src/app/services/felhasznaloService/felhasznalo.service';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { BejelentkezoFelhasznalo } from '../../models/bejelentkezo-felhasznalo';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.scss']
})
export class BejelentkezesComponent {

  bejelentkezoFelhasznalo: BejelentkezoFelhasznalo = new BejelentkezoFelhasznalo();
  jelszoElrejtes: boolean = true;

  constructor(
    private felhasznaloService: FelhasznaloService,
    private router: Router
  ) { }

  bejeletkezesEmail(): void {
    //"teszt@gmail.com", "NagyonNehez123"
    this.felhasznaloService.bejelentkezesEmaillel(this.bejelentkezoFelhasznalo.email, this.bejelentkezoFelhasznalo.jelszo);
  }

  bejeletkezesGoogle(): void {
    this.felhasznaloService.bejelentkezesPopup(new GoogleAuthProvider());
  }

  bejeletkezesFacebook(): void {
    this.felhasznaloService.bejelentkezesPopup(new FacebookAuthProvider());
  }

  navigacioBejelentkezesElottiOldalra(): void{
    this.router.navigate([]);
  }
}
