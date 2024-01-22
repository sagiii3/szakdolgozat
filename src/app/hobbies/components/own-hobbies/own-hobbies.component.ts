import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hobby } from '../../models/hobby';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { RecordHobbyComponent } from '../dialogs/record-hobby/record-hobby.component';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';

@Component({
  selector: 'app-own-hobbies',
  templateUrl: './own-hobbies.component.html',
  styleUrls: ['./own-hobbies.component.scss']
})
export class OwnHobbiesComponent implements OnInit, OnDestroy{
  globalVariables = GlobalVariables;
  
  hobbyList: Hobby[] = [];

  private ownHobbySubscription?: Subscription;

  constructor(
    private hobbyService: HobbyService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getOwnHobbies();
  }

  getOwnHobbies(): void {
    this.ownHobbySubscription = this.hobbyService.getOwnHobbies()
    .subscribe({
      next: (hobbies: Hobby[]) => {
        this.hobbyList = hobbies;
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_own_hobbies_error', error);
      }
    });
  }

  addToOwnHobby(hobby: Hobby): void {
    this.hobbyService.openDialog(RecordHobbyComponent, hobby);
  }

  ngOnDestroy(): void {
    this.ownHobbySubscription?.unsubscribe();
  }

}
