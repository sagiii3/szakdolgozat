import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './publikus/components/not-found/not-found.component';
import { GlobalVariables } from './shared/constants/globalVariables';

const routes: Routes = [
  { path: '', redirectTo: GlobalVariables.HOME_ROUTE, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
