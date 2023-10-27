import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramListaComponent } from 'src/app/feature/program/components/program-lista/program-lista.component';
import { UjProgramComponent } from './components/uj-program/uj-program.component';
import { ProgramRoutingModule } from './program-routing.module';



@NgModule({
  declarations: [
    ProgramListaComponent,
    UjProgramComponent
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule
  ]
})
export class ProgramModule { }
