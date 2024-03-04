import { Component, OnDestroy, OnInit } from '@angular/core';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { Hobby } from '../../models/hobby';
import { BilingualString } from 'src/app/shared/models/billingual-string';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-hobby',
  templateUrl: './add-new-hobby.component.html',
  styleUrls: ['./add-new-hobby.component.scss']
})
export class AddNewHobbyComponent implements OnInit, OnDestroy{
  hobby: Hobby = new Hobby(
    new BilingualString(),
    new BilingualString());

  categories?: Category[];

  getCategoriesSubscription?: Subscription;

  constructor(
    private hobbyService: HobbyService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
  }

  addNewHobby(): void {
    this.hobbyService.addNewHobby(this.hobby);
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

  cancel(): void {
    this.router.navigate([GlobalVariables.ROUTES.ownHobbies]);
  }

  ngOnDestroy(): void{
    this.getCategoriesSubscription?.unsubscribe();
  }
}
