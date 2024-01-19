import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Activity } from 'src/app/hobbies/models/activity';
import { Hobby } from 'src/app/hobbies/models/hobby';
import { OwnHobby } from 'src/app/hobbies/models/ownHobby';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';

@Component({
  selector: 'app-record-hobby',
  templateUrl: './record-hobby.component.html',
  styleUrls: ['./record-hobby.component.scss']
})
export class RecordHobbyComponent {

  constructor(
    private hobbyService: HobbyService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      hobby: Hobby,
    },
  ) { }

  activity: Activity = new Activity();

  saveHobby(): void {
    this.hobbyService.addHobbyToUserOwn(this.data.hobby);
    this.hobbyService.addActivityToOwnHobby(this.data.hobby.id, this.activity);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
