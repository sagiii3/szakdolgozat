import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalVariables } from '../shared/constants/globalVariables';
import { HobbyListComponent } from './components/hobby-list/hobby-list.component';
import { OwnHobbiesComponent } from './components/own-hobbies/own-hobbies.component';
import { HobbyDetailComponent } from './components/hobby-detail/hobby-detail.component';
import { ActivityWrapComponent } from './components/activity-wrap/activity-wrap.component';
import { AddNewHobbyComponent } from './components/add-new-hobby/add-new-hobby.component';
import { AuthGuardService } from '../services/authGuardService/auth-guard.service';


const routes: Routes = [
  { path: GlobalVariables.ROUTES.hobbyList, component: HobbyListComponent },
  { path: GlobalVariables.ROUTES.ownHobbies, component: OwnHobbiesComponent, canActivate: [AuthGuardService] },
  { path: GlobalVariables.ROUTES.hobbyList + '/:id', component: HobbyDetailComponent, canActivate: [AuthGuardService] },
  { path: GlobalVariables.ROUTES.activityWrap, component: ActivityWrapComponent, canActivate: [AuthGuardService] },
  { path: GlobalVariables.ROUTES.addNewHobby, component: AddNewHobbyComponent, canActivate: [AuthGuardService] },
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HobbyRoutingModule { }
