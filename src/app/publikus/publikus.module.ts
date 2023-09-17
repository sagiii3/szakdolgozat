import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { KezdolapComponent } from './components/kezdolap/kezdolap.component';
import { PublikusRoutingModule } from './publikus-routing.module';


@NgModule({
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    KezdolapComponent
  ],
  imports: [
    CommonModule,
    PublikusRoutingModule
  ]
})
export class PublikusModule { }
