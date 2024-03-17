import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalVariables } from './constants/globalVariables';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from '../services/authGuardService/auth-guard.service';


const routes: Routes = [
  {path: GlobalVariables.ROUTES.profile, component: ProfileComponent, canActivate: [AuthGuardService]}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SharedRoutingModule { }
