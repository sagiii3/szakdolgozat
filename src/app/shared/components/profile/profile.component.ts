import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/userService/user.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User = new User();


  profileSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileSubscription = this.userService.getUser().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error: Error) => {
        this.errorService.errorLog('profile_error', error);
      }
    });
  }


  logout(): void {
    this.userService.logout();
  }


  ngOnDestroy(): void {
    this.profileSubscription?.unsubscribe();
  }

}
