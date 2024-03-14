import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwnHobby } from '../../models/ownHobby';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { Subscription } from 'rxjs';
import { Activity } from '../../models/activity';
import { RecordHobbyComponent } from '../dialogs/record-hobby/record-hobby.component';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { Router } from '@angular/router';
import { Hobby } from '../../models/hobby';
import { FirebaseService } from 'src/app/services/firebaseService/firebase.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-hobby-detail',
  templateUrl: './hobby-detail.component.html',
  styleUrls: ['./hobby-detail.component.scss']
})
export class HobbyDetailComponent implements OnInit, OnDestroy {
  id?: string;
  hobby?: OwnHobby;

  getHobbySubscription?: Subscription;
  getHobbyActivitiesSubscription?: Subscription;
  deleteActivitySubscription?: Subscription;
  deleteOwnHobbySubscription?: Subscription;
  deleteCollectionSubscription?: Subscription;


  constructor(
    private activatedRoute: ActivatedRoute,
    private hobbyService: HobbyService,
    private errorService: ErrorService,
    private router: Router,
    private firebaseService: FirebaseService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || undefined;
    this.getHobby();
  }

  getHobby(): void {
    this.getHobbySubscription = this.hobbyService.getHobbyById(this.id).subscribe({
      next: (hobby: Hobby) => {
        this.hobby = new OwnHobby(hobby);
        this.getHobbyActivities();
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_hobby_by_id_error', error);
      }
    });
  }

  deleteActivity(id?: string): void {
    if(this.hobby?.activities.length == 1){
      this.deleteOwnHobbyWithSubcollection();
    }
    else{
      this.deleteActivitySubscription = this.hobbyService.deleteActivityByIds(this.hobby?.id, id).subscribe({
        next: () => {
          this.getHobbyActivities();
        },
        error: (error: Error) => {
          this.errorService.errorLog('get_activities_error', error);
        }
      });
    }
  }

  deleteOwnHobby(){
    this.deleteOwnHobbySubscription = this.hobbyService.deleteOwnHobby(this.id).subscribe({
      next: () => {
        this.router.navigate([GlobalVariables.ROUTES.ownHobbies]);
      },
      error: (error: Error) => {
        this.errorService.errorLog('delete_own_hobby_error', error);
      }
    });
  }

  deleteOwnHobbyWithSubcollection(){
    this.deleteCollectionSubscription = this.firebaseService.deleteCollection(
      GlobalVariables.COLLECTIONS.users + '/' + this.userService.getCurrentUser().id + '/' + 
      GlobalVariables.COLLECTIONS.ownHobbies + '/' + this.id + '/' + GlobalVariables.COLLECTIONS.activities).subscribe({
        next: () => {
          this.deleteOwnHobby()
        },
        error: (error: Error) => {
          this.errorService.errorLog('delete_ownhobby_error', error);
        }
      });
  }

  addToOwnHobbies(): void {
    this.hobbyService.openDialog(RecordHobbyComponent, this.hobby);
  }

  getHobbyActivities(): void {
    this.getHobbyActivitiesSubscription = this.hobbyService.getHobbyActivities(this.id).subscribe({
      next: (activities: Activity[]) => {
        if (this.hobby) {
          this.hobby.activities = activities;
        }
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_activities_error', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.getHobbySubscription?.unsubscribe();
    this.getHobbyActivitiesSubscription?.unsubscribe();
    this.deleteActivitySubscription?.unsubscribe();
    this.deleteOwnHobbySubscription?.unsubscribe();
  }
}
