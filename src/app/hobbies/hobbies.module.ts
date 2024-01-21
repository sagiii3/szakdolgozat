import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HobbyListComponent } from './components/hobby-list/hobby-list.component';
import { HobbyTileComponent } from './components/hobby-tile/hobby-tile.component';
import { SharedModule } from '../shared/shared.module';
import { HobbyRoutingModule } from './hobbies-routing.module';
import { OwnHobbiesComponent } from './components/own-hobbies/own-hobbies.component';
import { RecordHobbyComponent } from './components/dialogs/record-hobby/record-hobby.component';
import { HobbyDetailComponent } from './components/hobby-detail/hobby-detail.component';
import { ActivityTileComponent } from './components/activity-tile/activity-tile.component';


@NgModule({
  declarations: [
    HobbyListComponent,
    HobbyTileComponent,
    OwnHobbiesComponent,
    RecordHobbyComponent,
    HobbyDetailComponent,
    ActivityTileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HobbyRoutingModule
  ]
})
export class HobbiesModule { }
