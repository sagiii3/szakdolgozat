import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class FelhasznaloService {

  private bejelentkezesElottiUrl: string = '/kezdolap';

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  //a bejelentkezesElottiUrl gettere és settere
  getBejelentkezesElottiUrl(): string {
    return this.bejelentkezesElottiUrl;
  }

  setBejelentkezesElottiUrl(bejelentkezesElottiUrl: string): void {
    this.bejelentkezesElottiUrl = bejelentkezesElottiUrl;
  }

  async regisztracioEmaillel(email: string, password: string): Promise<void> {
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  async bejelentkezesEmaillel(email: string, password: string): Promise<void> {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  
  async bejelentkezesPopup(provider: any): Promise<void> {
    await this.angularFireAuth.signInWithPopup(provider);
  }

  async kijelentkezes(): Promise<void> {
    await this.angularFireAuth.signOut();
  }
}
