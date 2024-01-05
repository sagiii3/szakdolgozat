import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private previousLoginUrl: string = GlobalVariables.HOME_ROUTE;

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.angularFireAuth.onAuthStateChanged(user => {
        if (user) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });
  }

  // Getter for the previousLoginUrl
  getPreviousLoginUrl(): string {
    return this.previousLoginUrl;
  }

  // Setter for the previousLoginUrl
  setPreviousLoginUrl(previousLoginUrl: string): void {
    this.previousLoginUrl = previousLoginUrl;
  }

  async signupWithEmail(email: string, password: string): Promise<void> {
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  async loginWithPopup(provider: any): Promise<void> {
    await this.angularFireAuth.signInWithPopup(provider);
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await this.angularFireAuth.sendPasswordResetEmail(email);
  }

  async logout(): Promise<void> {
    await this.angularFireAuth.signOut();
  }
}
