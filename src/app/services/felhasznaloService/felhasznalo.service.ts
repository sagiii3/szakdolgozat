import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class FelhasznaloService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

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
