import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KezdolapComponent } from './components/kezdolap/kezdolap.component';
import { BejelentkezesComponent } from './components/bejelentkezes/bejelentkezes.component';
import { RegisztracioComponent } from './components/regisztracio/regisztracio.component';
import { GlobalisValtozok } from '../shared/constants/globalisValtozok';


const routes: Routes = [
  {path: GlobalisValtozok.KEZDOLAP_ROUTE, component: KezdolapComponent},
  {path: GlobalisValtozok.BEJELENTKEZES_ROUTE, component: BejelentkezesComponent},
  {path: GlobalisValtozok.REGISZTRACIO_ROUTE, component: RegisztracioComponent}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PublikusRoutingModule { }
