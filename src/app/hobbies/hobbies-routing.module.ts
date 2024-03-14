import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalVariables } from '../shared/constants/globalVariables';
import { HobbyListComponent } from './components/hobby-list/hobby-list.component';
import { OwnHobbiesComponent } from './components/own-hobbies/own-hobbies.component';
import { HobbyDetailComponent } from './components/hobby-detail/hobby-detail.component';
import { ActivityWrapComponent } from './components/activity-wrap/activity-wrap.component';
import { AddNewHobbyComponent } from './components/add-new-hobby/add-new-hobby.component';


const routes: Routes = [
  { path: GlobalVariables.ROUTES.hobbyList, component: HobbyListComponent },
  { path: GlobalVariables.ROUTES.ownHobbies, component: OwnHobbiesComponent },
  { path: GlobalVariables.ROUTES.hobbyList + '/:id', component: HobbyDetailComponent },
  { path: GlobalVariables.ROUTES.activityWrap, component: ActivityWrapComponent },
  { path: GlobalVariables.ROUTES.addNewHobby, component: AddNewHobbyComponent },
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HobbyRoutingModule { }
