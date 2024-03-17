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
import { IndexedDBService } from 'src/app/services/indexedDBService/indexed-db.service';

@Component({
  selector: 'app-hobby-detail',
  templateUrl: './hobby-detail.component.html',
  styleUrls: ['./hobby-detail.component.scss']
})
export class HobbyDetailComponent implements OnInit, OnDestroy {
  id?: string;
  hobby?: OwnHobby;
  online: boolean = navigator.onLine;

  getHobbySubscription?: Subscription;
  getHobbyActivitiesSubscription?: Subscription;
  deleteActivitySubscription?: Subscription;
  deleteOwnHobbySubscription?: Subscription;
  deleteCollectionSubscription?: Subscription;
  getHobbyFromIDBSubscription?: Subscription;
  getElementByIdSubscription?: Subscription;


  constructor(
    private activatedRoute: ActivatedRoute,
    private hobbyService: HobbyService,
    private errorService: ErrorService,
    private router: Router,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private indexedDBService: IndexedDBService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || undefined;
    if (this.online) {
      this.getHobby();
    }
    else {
      this.getHobbyFromIDB();
    }
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

  async getHobbyFromIDB(): Promise<void> {
    this.getHobbyFromIDBSubscription = (await this.indexedDBService.getElementById(this.id || "", GlobalVariables.DB_STORE_NAMES.ownHobbies))
    .subscribe({
      next: (hobby: any) => {
        this.hobby = hobby as OwnHobby;
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_element_by_id_from_idb_error', error);
      }
    });
  }


  deleteActivity(id?: string): void {
    if (this.hobby?.activities.length == 1) {
      this.deleteOwnHobbyWithSubcollection();
    }
    else {
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

  deleteOwnHobby() {
    this.deleteOwnHobbySubscription = this.hobbyService.deleteOwnHobby(this.id).subscribe({
      next: () => {
        this.router.navigate([GlobalVariables.ROUTES.ownHobbies]);
      },
      error: (error: Error) => {
        this.errorService.errorLog('delete_own_hobby_error', error);
      }
    });
  }

  deleteOwnHobbyWithSubcollection() {
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

  getHobbyActivities() {
    this.getHobbyActivitiesSubscription = this.hobbyService.getHobbyActivities(this.id).subscribe({
      next: async (activities: Activity[]) => {
        if (this.hobby) {
          this.hobby.activities = activities;
          this.getElementByIdSubscription = (await this.indexedDBService.getElementById(this.hobby.id || "", GlobalVariables.DB_STORE_NAMES.ownHobbies))
          .subscribe({
            next: (hobby : OwnHobby) => {
              this.hobby!.categories = hobby.categories;
              this.hobby!.categoryIds = hobby.categoryIds;
              this.indexedDBService.updateElement(GlobalVariables.DB_STORE_NAMES.ownHobbies, this.hobby);
            },
            error: (error: Error) => {
              this.errorService.errorLog("error", error);
            }
          });
          
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
    this.getHobbyFromIDBSubscription?.unsubscribe();
    this.getElementByIdSubscription?.unsubscribe();
  }
}
