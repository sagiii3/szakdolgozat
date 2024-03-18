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
import { BilingualString } from 'src/app/shared/models/billingual-string';
import { BilingualTranslatePipe } from 'src/app/shared/pipes/bilingual-translate.pipe';

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

  sortOrder?: boolean;
  
  online: boolean = navigator.onLine;

  private ownHobbySubscription?: Subscription;
  private getCategoriesSubscription?: Subscription;
  private deleteOwnHobbySubscription?: Subscription;
  private deleteCollectionSubscription?: Subscription;
  private ownHobbyFromIDBSubscription?: Subscription;
  private getCategoriesFromIDBSubscription?: Subscription;

  constructor(
    private hobbyService: HobbyService,
    private errorService: ErrorService,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private indexedDBService: IndexedDBService,
    private bilingualTranslate: BilingualTranslatePipe
  ) { }

  ngOnInit(): void {
    if (this.online) {
      this.getOwnHobbies();
      this.getCategories();
    }
    else {
      this.getOwnHobbiesFromIDB();
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
        this.getOwnHobbies();
      }
      else{
        this.getOwnHobbiesFromIDB();
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

  filter(): void{
    if (this.online) {
      this.getOwnHobbies();
    }
    else{
      this.getOwnHobbiesFromIDB();
    }
  }

  getOwnHobbies(): void {
    this.ownHobbySubscription = this.hobbyService.getOwnHobbies(this.categoryFilter?.id)
      .subscribe({
        next: (hobbies: OwnHobby[]) => {
          this.hobbyList = hobbies;
          this.hobbyList.forEach(hobby => {
            //save to indexedDB
            this.indexedDBService.addElement(hobby, GlobalVariables.DB_STORE_NAMES.ownHobbies, true);
          });
        },
        error: (error: Error) => {
          this.errorService.errorLog('get_own_hobbies_error', error);
        }
      });
  }

  async getOwnHobbiesFromIDB() {
    this.ownHobbyFromIDBSubscription = (await this.indexedDBService.loadCollection(GlobalVariables.DB_STORE_NAMES.ownHobbies, this.categoryFilter?.id))
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
        this.categories.forEach(category => {
          //save to indexedDB
          this.indexedDBService.addElement(category, GlobalVariables.DB_STORE_NAMES.categories, true);
        });
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_categories_error', error);
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
    this.getCategoriesFromIDBSubscription?.unsubscribe();
  }

}
