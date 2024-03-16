import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, filter, from, switchMap, throwError } from 'rxjs';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { User } from 'src/app/shared/models/user';
import { FirebaseService } from '../firebaseService/firebase.service';
import { ErrorService } from '../errorService/error.service';
import { SnackbarService } from '../snackbarService/snackbar.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private previousLoginUrl: string = GlobalVariables.ROUTES.home;

  user: User = new User();
  userSubscription?: Subscription;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private firebaseService: FirebaseService,
    private errorService: ErrorService,
    private snackbarService: SnackbarService,
    private translateService: TranslateService
  ) { }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.angularFireAuth.onAuthStateChanged(user => {
        user ? observer.next(true) : observer.next(false);
        this.user = new User(
          user?.uid,
          undefined,
          user?.displayName || undefined,
          user?.email || undefined,
          undefined,
          undefined,
          user?.photoURL || undefined);
      });
    });
  }

  saveUser(user: User): Promise<boolean> {
    user.id = this.user.id;
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

  async logout() {
    await this.angularFireAuth.signOut()
      .then(() => {
        this.snackbarService.snackbarSuccess(this.translateService.instant('successful_logout'));
        this.router.navigate([GlobalVariables.ROUTES.home]);
      }).catch((error: Error) => {
        this.errorService.errorLog("failed_login", error);
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
