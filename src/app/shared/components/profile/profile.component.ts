import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/userService/user.service';
import { ErrorService } from 'src/app/services/errorService/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User = new User();


  profileSubscription?: Subscription;
  offlineProfileSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    if(navigator.onLine){
      this.getProfile();
    }
    else{
      this.getOfflineProfile();
    }
  }

  getProfile(): void {
    this.profileSubscription = this.userService.getUser().subscribe({
      next: (user: User) => {
        this.user = user;
        //put to the local storage 
        localStorage.setItem('user', JSON.stringify(user));

      },
      error: (error: Error) => {
        this.errorService.errorLog('profile_error', error);
      }
    });
  }

  getOfflineProfile(): void{
    //get from the local storage
    const user = localStorage.getItem('user');
    if(user){
      this.user = JSON.parse(user);
    }
  }


  logout(): void {
    this.userService.logout();
  }


  ngOnDestroy(): void {
    this.profileSubscription?.unsubscribe();
    this.offlineProfileSubscription?.unsubscribe();
  }

}
