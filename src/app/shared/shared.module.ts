import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BilingualTranslatePipe } from './pipes/bilingual-translate.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { DateTimePipe } from './pipes/date-time.pipe';

@NgModule({
  declarations: [
    BilingualTranslatePipe,
    ProfileComponent,
    DateTimePipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    TranslateModule,
    FormsModule,
    BilingualTranslatePipe,
    DateTimePipe
  ]
})
export class SharedModule { }
