import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramListaComponent } from 'src/app/feature/program/components/program-lista/program-lista.component';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { UjProgramComponent } from './components/uj-program/uj-program.component';


const routes: Routes = [
    { path: GlobalVariables.PROGRAM_LISTA_ROUTE, component: ProgramListaComponent },
    { path: GlobalVariables.UJ_PROGRAM_ROUTE, component: UjProgramComponent }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ProgramRoutingModule { }
