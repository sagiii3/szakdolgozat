import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noop } from 'rxjs';
import { NotFoundComponent } from './publikus/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'kezdolap', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
