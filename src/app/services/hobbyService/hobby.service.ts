import { Injectable } from '@angular/core';
import { Hobby } from 'src/app/hobbies/models/hobby';
import { OwnHobby } from 'src/app/hobbies/models/ownHobby';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { FirebaseService } from '../firebaseService/firebase.service';
import { UserService } from '../userService/user.service';
import { Observable, catchError, combineLatest, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { ErrorService } from '../errorService/error.service';
import { Activity } from 'src/app/hobbies/models/activity';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user';
import { ActivityWrapData } from 'src/app/hobbies/models/activityWrapData';
import { BilingualTranslatePipe } from 'src/app/shared/pipes/bilingual-translate.pipe'

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    private bilingualTranslatePipe: BilingualTranslatePipe
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
    return this.userService.isAuthenticated().pipe(
      filter(isAuthenticated => isAuthenticated), // Ignore if not authenticated
      switchMap(() => {
        let userId = this.userService.getCurrentUser().id;
        let route = `${GlobalVariables.COLLECTIONS.users}/${userId}/${GlobalVariables.COLLECTIONS.ownHobbies}`;
        
        return this.firebaseService.getCollectionList(route).pipe(
          catchError((error: Error) => {
            this.errorService.errorLog('get_own_hobbies_error', error);
            return throwError(error); // re-throw the error after logging
          })
        );
      })
    );
  }

  getHobbyById(id?: string): Observable<OwnHobby> {
    return this.userService.getUser().pipe(
      switchMap((user: User) => {
        let route = GlobalVariables.COLLECTIONS.users + '/' + user.id + '/' + GlobalVariables.COLLECTIONS.ownHobbies;
        return this.firebaseService.getDocument(route, id || '').pipe(
          catchError((error: Error) => {
            this.errorService.errorLog('get_hobby_by_id_error', error);
            return throwError(error); // return the error as an observable
          })
        );
      }),
      catchError((error: Error) => {
        this.errorService.errorLog('get_user_error', error);
        return throwError(error); // re-throw the error after logging
      })
    );
  }


getActivityWrapData(): Observable<ActivityWrapData[]> {
  return this.getOwnHobbies().pipe(
    switchMap((hobbies: Hobby[]) => {
      if (!hobbies.length) {
        return of([]);
      }
      //végigmegy a hobbies tömbön és minden hobby elemre meghívja a getHobbyActivities-t, ami visszaad minden híváskor egy Observable<Activity[]>-t
      let activityObservables: Observable<Activity[]>[] = hobbies.map(hobby => this.getHobbyActivities(hobby.id));
      //combineLatest: várja az összes Observable-t és ha mindegyikből megérkezett az érték, akkor visszaadja az értékeket egy tömbben
      //Observable<Activity[]>[] -> Observable<Activity[][]>
      //pl: [ [activity1, activity2], [activity3, activity4] ] hobby1-hez tartozó activity-k (1, 2), hobby2-hez tartozó activity-k (3,4)
      return combineLatest(activityObservables).pipe(
        map((activitiesArrays: Activity[][]) => {
          activitiesArrays.reduce((activityArray: Activity[], value: Activity[]) => activityArray.concat(value), []);
          let data: ActivityWrapData[] = hobbies.map((hobby, index) => {
          let sum = activitiesArrays[index].reduce((total, activity) => total + (activity.spentHours || 0), 0);
            return new ActivityWrapData(
              this.bilingualTranslatePipe.transform(hobby.name),
              sum
            );
          });
          return data;
        })
      );
    })
  );
}


getHobbyActivities(hobbyId?: string): Observable<Activity[]> {
  return this.userService.getUser().pipe(
    switchMap((user: User) => {
      let route = `${GlobalVariables.COLLECTIONS.users}/${user.id}/${GlobalVariables.COLLECTIONS.ownHobbies}/${hobbyId}/${GlobalVariables.COLLECTIONS.activities}`;
      
      return this.firebaseService.getCollectionList(route).pipe(
        catchError((error: Error) => {
          this.errorService.errorLog('get_activities_error', error);
          return throwError(error); // re-throw the error after logging
        })
      );
    })
  );
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
