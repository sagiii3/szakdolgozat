import { Injectable } from '@angular/core';
import { Hobby } from 'src/app/hobbies/models/hobby';
import { OwnHobby } from 'src/app/hobbies/models/ownHobby';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { FirebaseService } from '../firebaseService/firebase.service';
import { UserService } from '../userService/user.service';
import { Observable } from 'rxjs';
import { ErrorService } from '../errorService/error.service';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private errorService: ErrorService
  ) { }

  addToOwnHobbies(hobby: Hobby): void {
    this.firebaseService.addToCollection(
      GlobalVariables.COLLECTIONS.users + '/' + this.userService.getCurrentUser().id + '/' + GlobalVariables.COLLECTIONS.ownHobbies,
      new OwnHobby(hobby, 0),
      'successful_own_hobby_save',
      'failed_own_hobby_save',
      OwnHobby);
  }

  getOwnHobbies(): Observable<OwnHobby[]> {
    //wait till the authorization is done and the current user is set
    return new Observable<OwnHobby[]>(observer => {
      this.userService.isAuthenticated().subscribe({
        next: (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            this.firebaseService.getCollectionList(
              GlobalVariables.COLLECTIONS.users + '/' + this.userService.getCurrentUser().id + '/' + GlobalVariables.COLLECTIONS.ownHobbies)
              .subscribe({
                next: (ownHobbies: OwnHobby[]) => {
                  observer.next(ownHobbies);
                },
                error: (error: any) => {
                  this.errorService.errorLog(error);
                }
              });
          }
        }
      });
    });
  }

  getHobbies(): Observable<Hobby[]> {
    return this.firebaseService.getCollectionList(GlobalVariables.COLLECTIONS.hobbies);
  }

}
