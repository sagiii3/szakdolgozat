import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { KezdolapComponent } from './components/kezdolap/kezdolap.component';
import { PublikusRoutingModule } from './publikus-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { BejelentkezesComponent } from './components/bejelentkezes/bejelentkezes.component';
import { RegisztracioComponent } from './components/regisztracio/regisztracio.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    KezdolapComponent,
    NotFoundComponent,
    FooterComponent,
    BejelentkezesComponent,
    RegisztracioComponent
  ],
  imports: [
    CommonModule,
    PublikusRoutingModule,
    SharedModule,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class PublikusModule { }
