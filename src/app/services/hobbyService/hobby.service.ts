import { Injectable } from '@angular/core';
import { Hobby } from 'src/app/hobbies/models/hobby';
import { OwnHobby } from 'src/app/hobbies/models/ownHobby';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { FirebaseService } from '../firebaseService/firebase.service';
import { UserService } from '../userService/user.service';
import { Observable } from 'rxjs';
import { ErrorService } from '../errorService/error.service';
import { Activity } from 'src/app/hobbies/models/activity';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private errorService: ErrorService,
    private dialog: MatDialog
  ) { }

  async addHobbyToUserOwn(hobby: Hobby): Promise<boolean> {
    return this.firebaseService.addToCollection(
      GlobalVariables.COLLECTIONS.users + '/' + this.userService.getCurrentUser().id + '/' + GlobalVariables.COLLECTIONS.ownHobbies,
      hobby,
      'successful_own_hobby_save',
      'failed_own_hobby_save',
      Hobby);
  }

  async addActivityToOwnHobby(hobbyId: string, activity: Activity): Promise<boolean> {
    return this.firebaseService.addToCollection(
      GlobalVariables.COLLECTIONS.users + '/' + this.userService.getCurrentUser().id + '/' +
      GlobalVariables.COLLECTIONS.ownHobbies + '/' + hobbyId + '/' + 
      GlobalVariables.COLLECTIONS.activities,
      activity,
      'successful_activity_save',
      'failed_activity_save',
      Activity);
  }

  openDialog(component: any, data: any): void {
    this.dialog.open(component, {
      data: {
        hobby: data
      },
      disableClose: true,
    });
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
                error: (error: Error) => {
                  this.errorService.errorLog('get_own_hobbies_error', error);
                }
              });
          }
        }
      });
    });
  }

  getHobbyById(id?: string): Observable<OwnHobby> {
    return new Observable<OwnHobby>(observer => {
      this.userService.getUser().subscribe({
        next: (user: User) => {
          let route = GlobalVariables.COLLECTIONS.users + '/' + user.id
            + '/' + GlobalVariables.COLLECTIONS.ownHobbies;
          this.firebaseService.getDocument(route, id || '').subscribe({
            next: (hobby: OwnHobby) => {
              observer.next(hobby);
            },
            error: (error: Error) => {
              this.errorService.errorLog('get_hobby_by_id_error', error);
            }
          });
        },
        error: (error: Error) => {
          this.errorService.errorLog('get_user_error', error);
        }
      });
    });
  }

  getHobbyActivities(hobbyId?: string): Observable<Activity[]> {
    return new Observable<Activity[]>(observer => {
      this.userService.getUser().subscribe({  
        next: (user: User) => {
          let route = GlobalVariables.COLLECTIONS.users + '/' + user.id
          + '/' + GlobalVariables.COLLECTIONS.ownHobbies + '/' + hobbyId
          + '/' + GlobalVariables.COLLECTIONS.activities;
          this.firebaseService.getCollectionList(route).subscribe({
            next: (activities: Activity[]) => {
              observer.next(activities);
            },
            error: (error: Error) => {
              this.errorService.errorLog('get_activities_error', error);
            }
          });
        },})});
  }

  getHobbies(): Observable<Hobby[]> {
    return this.firebaseService.getCollectionList(GlobalVariables.COLLECTIONS.hobbies);
  }

  async addNewHobby(hobby: Hobby): Promise<boolean> {
    return this.firebaseService.addToCollection(
      GlobalVariables.COLLECTIONS.hobbies, 
      hobby, 
      'successful_hobby_save', 
      'failed_hobby_save', 
      Hobby);
  }

}
