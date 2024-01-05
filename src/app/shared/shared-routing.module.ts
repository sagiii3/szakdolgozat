import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalVariables } from './constants/globalVariables';
import { HomeComponent } from '../publikus/components/home/home.component';


const routes: Routes = [
  //{path: GlobalVariables.HOME_ROUTE, component: HomeComponent}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SharedRoutingModule { }
