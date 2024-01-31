import { Component } from '@angular/core';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { Hobby } from '../../models/hobby';
import { BilingualString } from 'src/app/shared/models/billingual-string';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-hobby',
  templateUrl: './add-new-hobby.component.html',
  styleUrls: ['./add-new-hobby.component.scss']
})
export class AddNewHobbyComponent {
  hobby: Hobby = new Hobby(
    new BilingualString(),
    new BilingualString());
    
  constructor(
    private hobbyService: HobbyService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  addNewHobby(): void {
    this.hobbyService.addNewHobby(this.hobby);
  }

  cancel(): void {
    this.router.navigate([GlobalVariables.ROUTES.ownHobbies]);
  }
}
