import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hobby } from '../../models/hobby';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { RecordHobbyComponent } from '../dialogs/record-hobby/record-hobby.component';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { Category } from '../../models/category';

@Component({
  selector: 'app-own-hobbies',
  templateUrl: './own-hobbies.component.html',
  styleUrls: ['./own-hobbies.component.scss']
})
export class OwnHobbiesComponent implements OnInit, OnDestroy{
  globalVariables = GlobalVariables;
  
  hobbyList: Hobby[] = [];
  categoryFilter?: Category;
  categories?: Category[];

  private ownHobbySubscription?: Subscription;
  private getCategoriesSubscription?: Subscription;

  constructor(
    private hobbyService: HobbyService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getOwnHobbies();
    this.getCategories();
  }

  getOwnHobbies(): void {
    this.ownHobbySubscription = this.hobbyService.getOwnHobbies(this.categoryFilter?.id)
    .subscribe({
      next: (hobbies: Hobby[]) => {
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
      error: (error: any) => {
        this.errorService.errorLog(error);
      }
    });
  }

  addToOwnHobby(hobby: Hobby): void {
    this.hobbyService.openDialog(RecordHobbyComponent, hobby);
  }

  ngOnDestroy(): void {
    this.ownHobbySubscription?.unsubscribe();
    this.getCategoriesSubscription?.unsubscribe();
  }

}
