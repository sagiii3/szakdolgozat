import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hobby } from '../../models/hobby';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { RecordHobbyComponent } from '../dialogs/record-hobby/record-hobby.component';
import { Category } from '../../models/category';
import { UserService } from 'src/app/services/userService/user.service';
import { IndexedDBService } from 'src/app/services/indexedDBService/indexed-db.service';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { OwnHobby } from '../../models/ownHobby';

@Component({
  selector: 'app-hobby-list',
  templateUrl: './hobby-list.component.html',
  styleUrls: ['./hobby-list.component.scss']
})
export class HobbyListComponent implements OnInit, OnDestroy {

  hobbyList: Hobby[] = [];
  isLoggedIn: boolean = false;

  categoryFilter?: Category;
  categories?: Category[];

  private hobbyListSubscription?: Subscription;
  private hobbyListFromIDBSubscription?: Subscription;
  private loggedInSubscription?: Subscription;
  private getCategoriesSubscription?: Subscription;
  private getHobbyCategoriesSubscription?: Subscription;


  constructor(
    private errorService: ErrorService,
    private hobbyService: HobbyService,
    private userService: UserService,
    private indexedDBService: IndexedDBService

  ) { }

  ngOnInit(): void {
    this.getCategories();

    this.getLoggedInSubscription();
    if (navigator.onLine) {
      console.log("online")
      this.getHobbies();
    }
    else {
      console.log("offline")
      this.getHobbiesFromIDB();
    }
  }

  getHobbies(): void {
    this.indexedDBService.deleteDBData(GlobalVariables.DB_STORE_NAMES.hobbies);
    this.hobbyListSubscription = this.hobbyService.getHobbies(this.categoryFilter?.id)
      .subscribe({
        next: (hobbies: Hobby[]) => {
          this.hobbyList = hobbies;

          this.hobbyList.forEach(hobby => {
            hobby.categoryIds.forEach(categoryId => {
              hobby.categories = [];
              this.getHobbyCategoriesSubscription = this.hobbyService.getHobbyCategoryById(categoryId).subscribe({
                next: (category: Category) => {
                  hobby.categories.push(category);
                },
                error: (error: Error) => {
                  this.errorService.errorLog('get_hobby_category_error', error);
                },
                complete: () => {
                  //save to indexedDB
                  this.indexedDBService.addHobby(hobby as OwnHobby, GlobalVariables.DB_STORE_NAMES.hobbies, true);
                }
              });
            });
          });
        },
        error: (error: Error) => {
          this.errorService.errorLog('get_hobbies_error', error);
        }
      });
  }

  getHobbiesFromIDB() {
    this.hobbyListFromIDBSubscription = this.indexedDBService.loadHobbies(GlobalVariables.DB_STORE_NAMES.hobbies).subscribe(
      (hobbyList: Hobby[]) => {
        console.log(hobbyList, "aa")
        this.hobbyList = hobbyList.length > 0 ? hobbyList : [];
      });
  }

  getCategories(): void {
    this.getCategoriesSubscription = this.hobbyService.getHobbyCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        this.errorService.errorLog(error);
      }
    });
  }


  addToOwnHobbies(hobby: Hobby): void {
    if (this.isLoggedIn) {
      this.hobbyService.openDialog(RecordHobbyComponent, hobby);
    }
    else {
      this.errorService.errorLog("not_logged_in")
    }
  }

  getLoggedInSubscription(): void {
    this.loggedInSubscription = this.userService.isAuthenticated().subscribe({
      next: (data) => {
        this.isLoggedIn = data ? true : false;
      },
      error: (error: Error) => {
        this.errorService.errorLog("is_authenticated_error", error);
      }
    });
  }

  ngOnDestroy(): void {
    this.hobbyListSubscription?.unsubscribe();
    this.loggedInSubscription?.unsubscribe();
    this.getCategoriesSubscription?.unsubscribe();
    this.getHobbyCategoriesSubscription?.unsubscribe();
    this.hobbyListFromIDBSubscription?.unsubscribe();
  }

}
