import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KezdolapComponent } from './components/kezdolap/kezdolap.component';


const routes: Routes = [
  {path: 'kezdolap', component: KezdolapComponent}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PublikusRoutingModule { }
