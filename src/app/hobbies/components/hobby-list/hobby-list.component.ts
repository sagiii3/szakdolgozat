import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hobby } from '../../models/hobby';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { RecordHobbyComponent } from '../dialogs/record-hobby/record-hobby.component';
import { Category } from '../../models/category';

@Component({
  selector: 'app-hobby-list',
  templateUrl: './hobby-list.component.html',
  styleUrls: ['./hobby-list.component.scss']
})
export class HobbyListComponent implements OnInit, OnDestroy{

  hobbyList: Hobby[] = [];

  private hobbyListSubscription?: Subscription;
  constructor(
    private errorService: ErrorService,
    private hobbyService: HobbyService
    ) { }

  ngOnInit(): void {
    this.getHobbies();
  }

  getHobbies(): void {
    this.hobbyListSubscription = this.hobbyService.getHobbies()
    .subscribe({
      next: (hobbies: Hobby[]) => {
        this.hobbyList = hobbies;
        this.hobbyList.forEach(hobby => {
          hobby.categoryIds.forEach(categoryId => {
            hobby.categories = [];
            this.hobbyService.getHobbyCategoryById(categoryId).subscribe({
              next: (category: Category) => {
                hobby.categories.push(category);
              },
              error: (error: Error) => {
                this.errorService.errorLog('get_hobby_category_error', error);
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

  addToOwnHobbies(hobby: Hobby): void {
    this.hobbyService.openDialog(RecordHobbyComponent, hobby);
  }

  ngOnDestroy(): void {
    this.hobbyListSubscription?.unsubscribe();
  }

}
