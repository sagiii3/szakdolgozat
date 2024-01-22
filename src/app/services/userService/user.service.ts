import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { User } from 'src/app/shared/models/user';
import { FirebaseService } from '../firebaseService/firebase.service';
import { ErrorService } from '../errorService/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{

  private previousLoginUrl: string = GlobalVariables.ROUTES.home;

  user: User = new User();
  userSubscription?: Subscription;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private firebaseService: FirebaseService,
    private errorService: ErrorService
  ) { }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.angularFireAuth.onAuthStateChanged(user => {
        user ? observer.next(true) : observer.next(false);
        this.user = new User(
          user?.uid,
          undefined,
          user?.displayName || undefined,
          user?.email  || undefined, 
          undefined,
          undefined, 
          user?.photoURL  || undefined);
      });
    });
  }

  saveUser(user: User): void{
    this.firebaseService.addToCollection(
      GlobalVariables.COLLECTIONS.users,
      user,
      'successful_user_save',
      'failed_user_save',
      User
    );
    }

  getCurrentUser(): User {
    return this.user;
  }

  getUser(): Observable<User> {
    return new Observable<User>(observer => {
      this.isAuthenticated().subscribe({
        next: (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            console.log(this.user);
            this.firebaseService.getDocument(GlobalVariables.COLLECTIONS.users, this.user?.id ||'').subscribe({
              next: (user: User) => {
                this.user = user;
                observer.next(this.user);
              },
              error: (error: Error) => {
                this.errorService.errorLog('get_user_error', error);
              }
            });
          }
        },
        error: (error: Error) => {
          this.errorService.errorLog('is_authenticated_error', error);
        }
      });
    });
  }

  navigateToPreviousPageAfterLogin(): void {
    this.router.navigate([this.previousLoginUrl]);
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

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
