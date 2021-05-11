import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFormFieldInputComponent } from './thy-form-field-input/thy-form-field-input.component';
import { ThyFormFieldControlComponent } from './thy-form-field-control/thy-form-field-control.component';
import { ThyFormFieldAutocompleteComponent } from './thy-form-field-autocomplete/thy-form-field-autocomplete.component';
import { ThyFormFieldAutocompleteTreeComponent } from './thy-form-field-autocomplete/thy-form-field-autocomplete-tree/thy-form-field-autocomplete-tree.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ThyTranslateModule } from '../thy-translate/thy-translate.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { ThyFormFieldColorPickerComponent } from './thy-form-field-color-picker/thy-form-field-color-picker.component';
import { MatMenuModule } from '@angular/material/menu';
import { ColorPickerModule } from 'ngx-color-picker';
import { ThyFormFieldSelectComponent } from './thy-form-field-select/thy-form-field-select.component';
import { MatSelectModule } from '@angular/material/select';
import { ThyFormFieldTextareaComponent } from './thy-form-field-textarea/thy-form-field-textarea.component';
import { ThyFormFieldDatepickerComponent } from './thy-form-field-datepicker/thy-form-field-datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThyFormFieldDatetimepickerComponent } from './thy-form-field-datetimepicker/thy-form-field-datetimepicker.component';
import { ThyFormFieldToolbarInputComponent } from './thy-form-field-toolbar-input/thy-form-field-toolbar-input.component';
import { ThyFormFieldToolbarDatepickerComponent } from './thy-form-field-toolbar-datepicker/thy-form-field-toolbar-datepicker.component';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { ThyTranslateService } from '../thy-translate';
import { ThyFormFieldAutocompleteLazyComponent } from './thy-form-field-autocomplete/thy-form-field-autocomplete-lazy/thy-form-field-autocomplete-lazy.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


const FR_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const EN_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

let format: MatDateFormats;

@NgModule({
  declarations: [
    ThyFormFieldInputComponent,
    ThyFormFieldControlComponent,
    ThyFormFieldAutocompleteComponent,
    ThyFormFieldColorPickerComponent,
    ThyFormFieldSelectComponent,
    ThyFormFieldTextareaComponent,
    ThyFormFieldDatepickerComponent,
    ThyFormFieldDatetimepickerComponent,
    ThyFormFieldToolbarInputComponent,
    ThyFormFieldAutocompleteTreeComponent,
    ThyFormFieldToolbarDatepickerComponent,
    ThyFormFieldAutocompleteLazyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatTooltipModule,
    ColorPickerModule,
    ThyTranslateModule
  ],
  exports: [
    ThyFormFieldInputComponent,
    ThyFormFieldControlComponent,
    ThyFormFieldAutocompleteComponent,
    ThyFormFieldColorPickerComponent,
    ThyFormFieldSelectComponent,
    ThyFormFieldTextareaComponent,
    ThyFormFieldDatepickerComponent,
    ThyFormFieldDatetimepickerComponent,
    ThyFormFieldToolbarInputComponent,
    ThyFormFieldAutocompleteTreeComponent,
    ThyFormFieldAutocompleteLazyComponent,
    ThyFormFieldToolbarDatepickerComponent
  ],
  providers: [
    // MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DATE_FORMATS, useValue: FR_FORMAT },
  ],
})
export class ThyFormFieldModule {

  constructor(private translateService: ThyTranslateService) {
    format = this.translateService.identifier === 'fr' ? FR_FORMAT : EN_FORMAT;
  }

}

