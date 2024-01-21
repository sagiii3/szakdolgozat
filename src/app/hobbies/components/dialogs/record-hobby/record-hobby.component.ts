import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Activity } from 'src/app/hobbies/models/activity';
import { Hobby } from 'src/app/hobbies/models/hobby';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';

@Component({
  selector: 'app-record-hobby',
  templateUrl: './record-hobby.component.html',
  styleUrls: ['./record-hobby.component.scss']
})
export class RecordHobbyComponent {

  constructor(
    private hobbyService: HobbyService,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      hobby: Hobby,
    },
  ) { }

  activity: Activity = new Activity();

  saveHobby(): void {
    this.hobbyService.addHobbyToUserOwn(this.data.hobby);
    this.hobbyService.addActivityToOwnHobby(this.data.hobby.id || '', this.activity);
    //todo csak ha sikerültek a mentések
    this.closeDialog();
    this.router.navigate([GlobalVariables.ROUTES.ownHobbies, this.data.hobby.id]);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
