import { Component, OnDestroy, OnInit } from '@angular/core';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { Hobby } from '../../models/hobby';
import { BilingualString } from 'src/app/shared/models/billingual-string';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BilingualTranslatePipe } from 'src/app/shared/pipes/bilingual-translate.pipe';
import { MatSelectionListChange } from '@angular/material/list';

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

  categoriesFormControl = new FormControl();
  

  getCategoriesSubscription?: Subscription;

  constructor(
    private hobbyService: HobbyService,
    private router: Router,
    private errorService: ErrorService,
    private translateService: TranslateService,
    private bilingualTranslatePipe: BilingualTranslatePipe
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  addNewHobby(): void {
    this.hobby.categories = this.categoriesFormControl.value;
    this.hobbyService.addNewHobby(this.hobby);
  }


  getCategories(): void {
    this.getCategoriesSubscription = this.hobbyService.getHobbyCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        this.categories.forEach(element => {
          if (this.bilingualTranslatePipe.transform(element.name) == this.translateService.instant("custom")) {
            this.categoriesFormControl.setValue([element]);
          }
        });
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
