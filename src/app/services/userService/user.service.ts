import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, filter, from, switchMap, throwError } from 'rxjs';
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

  saveUser(user: User): Promise<boolean>{
    user.id = this.user.id;
    user.confirmPassword = undefined;
    user.password = undefined;
    return this.firebaseService.addToCollection(
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
    return this.isAuthenticated().pipe(
      filter(isAuthenticated => isAuthenticated),
      switchMap(() => {
        return this.firebaseService.getDocument(GlobalVariables.COLLECTIONS.users, this.user?.id || '').pipe(
          catchError((error: Error) => {
            this.errorService.errorLog('get_user_error', error);
            return throwError(error); // re-throw the error after logging
          })
        );
      }),
      switchMap((user: User) => {
        this.user = user;
        return from([this.user]);
      })
    );
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
