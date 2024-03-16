import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hobby } from '../../models/hobby';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { Observable, Observer, Subscription, fromEvent, map, merge } from 'rxjs';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { RecordHobbyComponent } from '../dialogs/record-hobby/record-hobby.component';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { Category } from '../../models/category';
import { OwnHobby } from '../../models/ownHobby';
import { Activity } from '../../models/activity';
import { FirebaseService } from 'src/app/services/firebaseService/firebase.service';
import { UserService } from 'src/app/services/userService/user.service';
import { IndexedDBService } from 'src/app/services/indexedDBService/indexed-db.service';

@Component({
  selector: 'app-own-hobbies',
  templateUrl: './own-hobbies.component.html',
  styleUrls: ['./own-hobbies.component.scss']
})
export class OwnHobbiesComponent implements OnInit, OnDestroy {
  globalVariables = GlobalVariables;

  hobbyList: OwnHobby[] = [];
  categoryFilter?: Category;
  categories?: Category[];

  online: boolean = navigator.onLine;

  private ownHobbySubscription?: Subscription;
  private getCategoriesSubscription?: Subscription;
  private deleteOwnHobbySubscription?: Subscription;
  private deleteCollectionSubscription?: Subscription;
  private ownHobbyFromIDBSubscription?: Subscription;

  constructor(
    private hobbyService: HobbyService,
    private errorService: ErrorService,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private indexedDBService: IndexedDBService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    if (this.online) {
      this.getOwnHobbies();
    }
    else {
      this.getOwnHobbiesFromIDB();
    }
  }

  getOwnHobbies(): void {
    this.indexedDBService.deleteDBData(GlobalVariables.DB_STORE_NAMES.ownHobbies);
    this.ownHobbySubscription = this.hobbyService.getOwnHobbies(this.categoryFilter?.id)
      .subscribe({
        next: (hobbies: OwnHobby[]) => {
          this.hobbyList = hobbies;
          this.hobbyList.forEach(hobby => {
            //save to indexedDB
            this.indexedDBService.addHobby(hobby, GlobalVariables.DB_STORE_NAMES.ownHobbies, true);
          });
        },
        error: (error: Error) => {
          this.errorService.errorLog('get_own_hobbies_error', error);
        }
      });
  }

  getOwnHobbiesFromIDB(): void {
    this.ownHobbyFromIDBSubscription = this.indexedDBService.loadHobbies(GlobalVariables.DB_STORE_NAMES.ownHobbies)
      .subscribe({
        next: (hobbies: OwnHobby[]) => {
          this.hobbyList = hobbies;
        },
        error: (error: Error) => {
          this.errorService.errorLog('get_own_hobbies_idb_error', error);
        }
      });
  }

  getCategories(): void {
    this.getCategoriesSubscription = this.hobbyService.getHobbyCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_categories_error', error);
      }
    });
  }

  addToOwnHobby(hobby: Hobby): void {
    this.hobbyService.openDialog(RecordHobbyComponent, hobby);
  }

  deleteOwnHobby(hobby: OwnHobby) {
    this.deleteCollectionSubscription = this.firebaseService.deleteCollection(
      GlobalVariables.COLLECTIONS.users + '/' + this.userService.getCurrentUser().id + '/' +
      GlobalVariables.COLLECTIONS.ownHobbies + '/' + hobby.id + '/' + GlobalVariables.COLLECTIONS.activities).subscribe({
        next: () => {
          this.deleteOwnHobbySubscription = this.hobbyService.deleteOwnHobby(hobby.id).subscribe({
            next: () => {
              this.getOwnHobbies();
            },
            error: (error: Error) => {
              this.errorService.errorLog('delete_ownhobby_error', error);
            }
          });
        },
        error: (error: Error) => {
          this.errorService.errorLog('delete_ownhobby_error', error);
        }
      });
  }

  ngOnDestroy(): void {
    this.ownHobbySubscription?.unsubscribe();
    this.getCategoriesSubscription?.unsubscribe();
    this.deleteOwnHobbySubscription?.unsubscribe();
    this.deleteCollectionSubscription?.unsubscribe();
    this.ownHobbyFromIDBSubscription?.unsubscribe();
  }

}
