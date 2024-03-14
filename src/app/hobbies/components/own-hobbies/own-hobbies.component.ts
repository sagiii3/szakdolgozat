import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hobby } from '../../models/hobby';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { RecordHobbyComponent } from '../dialogs/record-hobby/record-hobby.component';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { Category } from '../../models/category';
import { OwnHobby } from '../../models/ownHobby';
import { Activity } from '../../models/activity';
import { FirebaseService } from 'src/app/services/firebaseService/firebase.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-own-hobbies',
  templateUrl: './own-hobbies.component.html',
  styleUrls: ['./own-hobbies.component.scss']
})
export class OwnHobbiesComponent implements OnInit, OnDestroy{
  globalVariables = GlobalVariables;
  
  hobbyList: OwnHobby[] = [];
  categoryFilter?: Category;
  categories?: Category[];

  private ownHobbySubscription?: Subscription;
  private getCategoriesSubscription?: Subscription;
  private deleteOwnHobbySubscription?: Subscription;
  private deleteCollectionSubscription?: Subscription;

  constructor(
    private hobbyService: HobbyService,
    private errorService: ErrorService,
    private firebaseService: FirebaseService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getOwnHobbies();
    this.getCategories();
  }

  getOwnHobbies(): void {
    this.ownHobbySubscription = this.hobbyService.getOwnHobbies(this.categoryFilter?.id)
    .subscribe({
      next: (hobbies: OwnHobby[]) => {
        this.hobbyList = hobbies;
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_own_hobbies_error', error);
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

  deleteOwnHobby(hobby: OwnHobby){
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
  }

}
