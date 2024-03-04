import { Injectable } from '@angular/core';
import { Hobby } from 'src/app/hobbies/models/hobby';
import { OwnHobby } from 'src/app/hobbies/models/ownHobby';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { FirebaseService } from '../firebaseService/firebase.service';
import { UserService } from '../userService/user.service';
import { Observable, catchError, combineLatest, filter, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';
import { ErrorService } from '../errorService/error.service';
import { Activity } from 'src/app/hobbies/models/activity';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user';
import { ActivityWrapData } from 'src/app/hobbies/models/activityWrapData';
import { BilingualTranslatePipe } from 'src/app/shared/pipes/bilingual-translate.pipe'
import { Category } from 'src/app/hobbies/models/category';

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

/*
getOwnHobbies(): Observable<OwnHobby[]> {
  return this.userService.isAuthenticated().pipe(
    filter(isAuthenticated => isAuthenticated),
    switchMap(() => {
      const userId = this.userService.getCurrentUser().id;
      const route = `${GlobalVariables.COLLECTIONS.users}/${userId}/${GlobalVariables.COLLECTIONS.ownHobbies}`;

      return this.firebaseService.getCollectionList(route).pipe(
        switchMap((ownHobbies: OwnHobby[]) => {
          if (ownHobbies.length === 0) {
            return of([]);
          }
          console.log(ownHobbies)
          const hobbyRequests = ownHobbies.map(ownHobby => {
            return this.getHobbyById(ownHobby.id).pipe(
              tap(data => console.log(data)),
              catchError((error: Error) => {
                this.errorService.errorLog('get_hobby_by_id_error', error);
                return throwError(error);
              })
            );
          });

          return forkJoin(hobbyRequests).pipe(
            switchMap((hobbies: Hobby[]) => {
              console.log(hobbies)
              ownHobbies.forEach((ownHobby, index) => {
                ownHobby.hobbyCopy(hobbies[index]);
                console.log(hobbies[index])
              });
              return of(ownHobbies);
            }),
            catchError((error: Error) => {
              this.errorService.errorLog('get_hobbies_by_ids_error', error);
              return throwError(error);
            })
          );
        }),
        catchError((error: Error) => {
          this.errorService.errorLog('get_own_hobbies_error', error);
          return throwError(error);
        })
      );
    })
  );
}*/

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

  deleteActivityByIds(hobbyId?: string, activityId?: string): Observable<any>{
    return this.userService.getUser().pipe(
      switchMap((user: User) => {
        let route = GlobalVariables.COLLECTIONS.users + '/' + user.id + '/' + GlobalVariables.COLLECTIONS.ownHobbies
        + '/' + hobbyId + '/' + GlobalVariables.COLLECTIONS.activities;
        return this.firebaseService.removeFromCollection(route, activityId || '')
      }),
      catchError((error: Error) => {
        this.errorService.errorLog('get_user_error', error);
        return throwError(error); // re-throw the error after logging
      })
    );
  }


  getActivityWrapData(monthly?: boolean): Observable<ActivityWrapData[] | ActivityWrapData[][]> {
    return this.getOwnHobbies().pipe(
      switchMap((hobbies: Hobby[]) => {
        if (!hobbies.length) {
          return of([]);
        }
        let activityObservables: Observable<Activity[]>[] = hobbies.map(hobby => this.getHobbyActivities(hobby.id));
        return combineLatest(activityObservables).pipe(
          map((activitiesArrays: Activity[][]) => {
            if (monthly) {
              let monthlyData: ActivityWrapData[][] = Array.from({ length: 12 }, () => []);

              hobbies.map((hobby, index) => {
                for (let i = 0; i < 12; i++) {
                  let sum = activitiesArrays[index]
                    .filter(activity => {
                      return activity.date?.toDate().getMonth() === i;
                    })
                    .reduce((sum, activity) => {
                      return sum + (activity.spentHours || 0);
                    }, 0);
                  
                    monthlyData[i].push(new ActivityWrapData(
                      this.bilingualTranslatePipe.transform(hobby.name),
                      sum
                    ));
                  
                }
              });
              return monthlyData;
            }
            else {
              let data: ActivityWrapData[] = hobbies.map((hobby, index) => {
                let sum = activitiesArrays[index].reduce((sum, activity) => {
                  return sum + (activity.spentHours || 0);
                }, 0);
                return new ActivityWrapData(
                  this.bilingualTranslatePipe.transform(hobby.name),
                  sum
                );
              });
              return data;
            }
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

  getHobbyCategories(): Observable<Category[]> {
    return this.firebaseService.getCollectionList(GlobalVariables.COLLECTIONS.categories);
  }

  getHobbyCategoryById(id?: string): Observable<Category> {
    return this.firebaseService.getDocument(GlobalVariables.COLLECTIONS.categories, id || '');
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
