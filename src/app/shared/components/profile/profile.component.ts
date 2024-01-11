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
  passwordHide: boolean = true;
  repeatPasswordHide: boolean = true;
  oldPasswordHide: boolean = true;
  hasImage: boolean = false;
  user: User = new User();
  modifiedUser: User = new User();
  wantToModify: boolean = false;
  passwordChange: boolean = false;
  
  private profileSubscription?: Subscription;
  private profileModificationSubscription?: Subscription;
  
  constructor(
    private userService: UserService,
    private errorService: ErrorService) {}
  
  ngOnInit(): void {
    this.getProfile();
  }
  
  onSave(formName: NgForm) {
    if (!formName.form.valid) {
      this.errorService.errorLog('Invalid form');
    } else {

    }
  }
  
  profileImageUpload(event: any) {
    if (event != null && event.target != null) {
      this.modifiedUser.photoURL = event.target.files[0];
      this.hasImage = true;
    }
  }
  
  cancel(): void {
    this.wantToModify = false;
    this.passwordChange = false;
    this.modifiedUser = this.user;
  }
  
  getProfile(): void {
    //this.user = this.userService.getUser();
    this.modifiedUser = this.user; 
  }
  
  ngOnDestroy(): void {
    this.profileSubscription?.unsubscribe();
    this.profileModificationSubscription?.unsubscribe();
  }
  
}
