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
import { BilingualString } from 'src/app/shared/models/billingual-string';
import { BilingualTranslatePipe } from 'src/app/shared/pipes/bilingual-translate.pipe';

@Component({
  selector: 'app-hobby-list',
  templateUrl: './hobby-list.component.html',
  styleUrls: ['./hobby-list.component.scss']
})
export class HobbyListComponent implements OnInit, OnDestroy {

  hobbyList: Hobby[] = [];
  isLoggedIn: boolean = false;

  online: boolean = navigator.onLine;

  sortOrder?: boolean;

  categoryFilter?: Category;
  categories?: Category[];

  private hobbyListSubscription?: Subscription;
  private hobbyListFromIDBSubscription?: Subscription;
  private loggedInSubscription?: Subscription;
  private getCategoriesSubscription?: Subscription;
  private getHobbyCategoriesSubscription?: Subscription;
  private getCategoriesFromIDBSubscription?: Subscription;


  constructor(
    private errorService: ErrorService,
    private hobbyService: HobbyService,
    private userService: UserService,
    private indexedDBService: IndexedDBService,
    private bilingualTranslate: BilingualTranslatePipe

  ) { }

  ngOnInit(): void {
    this.getLoggedInSubscription();
    if (this.online) {
      this.getHobbies();
      this.getCategories();
    }
    else {
      this.getHobbiesFromIDB();
      this.getCategoriesFromIDB();
    }
  }

  translator(name: BilingualString): string {
    return this.bilingualTranslate.transform(name);
  }

  sort(): void {
    if(this.sortOrder){
      this.sortOrder = false;
    }
    else{
      if(this.sortOrder == false){
        this.sortOrder = undefined;
      }
      else{
        this.sortOrder = true;
      }
    }
    if(this.sortOrder != undefined){
      this.hobbyList.sort((a, b) => {
        let nameA = this.translator(a.name);
        let nameB = this.translator(b.name);

        return this.hungarianCompare(nameA, nameB);
      });
    }
    else{
      if(navigator.onLine){
        this.getHobbies();
      }
      else{
        this.getHobbiesFromIDB();
      }
    }
  }

  hungarianCompare(a: string, b: string): number {
    let hungarianOrder = 'aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyzAÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ';

    for (let i = 0; i < a.length && i < b.length; i++) {
      let indexA = hungarianOrder.indexOf(a[i]);
      let indexB = hungarianOrder.indexOf(b[i]);

      if (indexA !== indexB) {
        if (this.sortOrder) {
          return indexA - indexB;
        }
        else {
          return indexB - indexA;
        }
      }
    }
    return this.sortOrder ? a.length - b.length : b.length - a.length;
  }

  filter(): void {
    if (this.online) {
      this.getHobbies();
    }
    else {
      this.getHobbiesFromIDB();
    }
  }

  getHobbies(): void {
    this.hobbyListSubscription = this.hobbyService.getHobbies(this.categoryFilter?.id)
      .subscribe({
        next: (hobbies: Hobby[]) => {
          this.hobbyList = hobbies;

          this.hobbyList.forEach(hobby => {
            hobby.categoryIds.forEach(categoryId => {
              hobby.categories = [];
              hobby.categoryIds = [];
              this.getHobbyCategoriesSubscription = this.hobbyService.getHobbyCategoryById(categoryId).subscribe({
                next: (category: Category) => {
                  hobby.categories.push(category);
                  hobby.categoryIds.push(category.id!);
                },
                error: (error: Error) => {
                  this.errorService.errorLog('get_hobby_category_error', error);
                },
                complete: () => {
                  //save to indexedDB
                  this.indexedDBService.addElement(hobby as OwnHobby, GlobalVariables.DB_STORE_NAMES.hobbies, true);
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

  async getHobbiesFromIDB() {
    this.hobbyListFromIDBSubscription = (await this.indexedDBService.loadCollection(GlobalVariables.DB_STORE_NAMES.hobbies, this.categoryFilter?.id))
      .subscribe({
        next: (hobbies: Hobby[]) => {
          this.hobbyList = hobbies;
        },
        error: (error: Error) => {
          this.errorService.errorLog('get_hobbies_idb_error', error);
        }
      });
  }


  getCategories(): void {
    this.getCategoriesSubscription = this.hobbyService.getHobbyCategories()
      .subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
          this.categories.forEach(category => {
            //save to indexedDB
            this.indexedDBService.addElement(category, GlobalVariables.DB_STORE_NAMES.categories, true);
          });

        },
        error: (error: any) => {
          this.errorService.errorLog(error);
        }
      });
  }

  async getCategoriesFromIDB() {
    this.getCategoriesFromIDBSubscription = (await this.indexedDBService.loadCollection(GlobalVariables.DB_STORE_NAMES.categories))
      .subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
        },
        error: (error: Error) => {
          this.errorService.errorLog('get_categories_error', error);
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
    this.getCategoriesFromIDBSubscription?.unsubscribe();
  }

}
