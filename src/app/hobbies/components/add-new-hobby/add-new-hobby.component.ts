import { Component } from '@angular/core';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { Hobby } from '../../models/hobby';
import { BilingualString } from 'src/app/shared/models/billingual-string';

@Component({
  selector: 'app-add-new-hobby',
  templateUrl: './add-new-hobby.component.html',
  styleUrls: ['./add-new-hobby.component.scss']
})
export class AddNewHobbyComponent {
  hobby: Hobby = new Hobby(
    'id', 
    new BilingualString("Napkin Collecting", "Szalvétagyűjtés"),
    new BilingualString("Collecting napkins from all over the world", "Szalvétákat gyűjteni a világ minden tájáról"),
    "https://floweralley.files.wordpress.com/2022/03/img_7975.jpg");
  constructor(
    private hobbyService: HobbyService
  ) {}

  ngOnInit() {
  }

  addNewHobby(): void {
    this.hobbyService.addNewHobby(this.hobby);
  }
}
