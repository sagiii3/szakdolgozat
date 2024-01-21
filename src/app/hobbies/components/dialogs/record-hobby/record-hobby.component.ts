import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Activity } from 'src/app/hobbies/models/activity';
import { Hobby } from 'src/app/hobbies/models/hobby';
import { ErrorService } from 'src/app/services/errorService/error.service';
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
    private errorService: ErrorService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      hobby: Hobby,
    },
  ) { }

  activity: Activity = new Activity();

  saveHobby(): void {
    //todo: check if activity is valid
    if(this.activity.spentHours && this.activity.spentHours > 0){
      let addHobby: boolean = this.hobbyService.addHobbyToUserOwn(this.data.hobby);
      let addActivity: boolean = this.hobbyService.addActivityToOwnHobby(this.data.hobby.id || '', this.activity);
      if(addHobby && addActivity){
        this.closeDialog();
        this.router.navigate([GlobalVariables.ROUTES.ownHobbies, this.data.hobby.id]);
      }
      else{
        this.errorService.errorLog('save_problem');
      }
    }
    else{
      this.errorService.errorLog('invalid_activity');
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
