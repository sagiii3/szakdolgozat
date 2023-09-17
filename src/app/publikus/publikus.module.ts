import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PublikusModule { }
