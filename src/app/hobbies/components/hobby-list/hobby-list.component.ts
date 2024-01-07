import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase.service';
import { Hobby } from '../../models/hobby';
import { Subscription } from 'rxjs';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { ErrorService } from 'src/app/services/errorService/error.service';

@Component({
  selector: 'app-hobby-list',
  templateUrl: './hobby-list.component.html',
  styleUrls: ['./hobby-list.component.scss']
})
export class HobbyListComponent implements OnInit, OnDestroy{

  hobbies: Hobby[] = [];

  hobbyListSubscription?: Subscription;
  constructor(
    private firebaseService: FirebaseService,
    private errorService: ErrorService
    ) { }

  ngOnInit(): void {
    this.getHobbies();
  }

  getHobbies(): void {
    this.hobbyListSubscription = this.firebaseService.getCollectionList(GlobalVariables.COLLECTIONS.hobbies)
    .subscribe({
      next: (hobbies: Hobby[]) => {
        this.hobbies = hobbies;
      },
      error: (error: any) => {
        this.errorService.errorLog(error);
      },
    });
  }

  addHobby(hobby: Hobby): void {
    
    
  }

  ngOnDestroy(): void {
    this.hobbyListSubscription?.unsubscribe();
  }

}
