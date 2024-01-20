import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hobby } from '../../models/hobby';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { MatDialog } from '@angular/material/dialog';
import { RecordHobbyComponent } from '../dialogs/record-hobby/record-hobby.component';

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
      },
      error: (error: any) => {
        this.errorService.errorLog(error);
      },
    });
  }

  addToOwnHobbies(hobby: Hobby): void {
    this.hobbyService.openDialog(RecordHobbyComponent, hobby);
  }

  ngOnDestroy(): void {
    this.hobbyListSubscription?.unsubscribe();
  }

}
