import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase.service';
import { Hobby } from '../../models/hobby';
import { Subscription } from 'rxjs';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';

@Component({
  selector: 'app-hobby-list',
  templateUrl: './hobby-list.component.html',
  styleUrls: ['./hobby-list.component.scss']
})
export class HobbyListComponent implements OnInit, OnDestroy{

  hobbies: Hobby[] = [];

  hobbyListSubscription?: Subscription;
  constructor(
    private firebaseService: FirebaseService
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
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  addHobby(hobby: Hobby): void {
    
    
  }

  ngOnDestroy(): void {
    console.log('HobbyListComponent destroyed');
  }

}
