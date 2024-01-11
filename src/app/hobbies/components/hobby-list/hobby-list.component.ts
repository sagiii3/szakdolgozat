import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebaseService/firebase.service';
import { Hobby } from '../../models/hobby';
import { Subscription } from 'rxjs';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { OwnHobby } from '../../models/ownHobby';
import { UserService } from 'src/app/services/userService/user.service';

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
    private errorService: ErrorService,
    private userService: UserService
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

  addToOwnHobbies(id: string): void {
    this.firebaseService.addToCollection(
      GlobalVariables.COLLECTIONS.users + '/' + this.userService.getCurrentUser().id + '/' + GlobalVariables.COLLECTIONS.ownHobbies,
      new OwnHobby(id, 0),
      'successful_own_hobby_save',
      'failed_own_hobby_save',
      OwnHobby);
  }

  ngOnDestroy(): void {
    this.hobbyListSubscription?.unsubscribe();
  }

}
