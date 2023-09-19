
import { NgModule } from '@angular/core';


//Angular Material Components
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MatBadgeModule} from '@angular/material/badge';
import 'moment/locale/hu';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
  NgxMatDateAdapter,
  NGX_MAT_DATE_FORMATS
} from '@angular-material-components/datetime-picker';

import {NgxMatMomentAdapter, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular-material-components/moment-adapter';

export const DateFormat = {
    display: {
        dateInput: 'YYYY-MM-DD HH:mm', //'YYYY-MM-DD HH:mm',
        monthYearLabel: "YYYY. MMMM.",
        dateA11yLabel: "YYYY. MM. DD.",
        monthYearA11yLabel: "YYYY. MMMM."
    },
    parse: {
      dateInput: 'YYYY-MM-DD HH:mm',//'YYYY-MM-DD HH:mm',
      monthYearLabel: "YYYY. MMMM.",
      dateA11yLabel: "YYYY. MM. DD.",
      monthYearA11yLabel: "YYYY. MMMM."
    },
};


@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Első oldal`;
  itemsPerPageLabel = `Oldalméret`;
  lastPageLabel = `Utolsó oldal`;

  nextPageLabel = 'Következő oldal';
  previousPageLabel = 'Előző oldal';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length == 0 || pageSize == 0) {
      return `0 / ${length}`;
    }
    if (length== 1) {
      return `1 / 1`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }
}

const materialModules = [
  MatNativeDateModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
]


@NgModule({
  declarations: [],
  imports: [
    materialModules
  ],
  exports: [
    materialModules
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {provide: MAT_DATE_LOCALE, useValue: 'hu'},
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: NGX_MAT_DATE_FORMATS, useValue: DateFormat },
  ]
})
export class MaterialModule { }
