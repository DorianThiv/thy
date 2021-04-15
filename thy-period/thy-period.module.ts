import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyPeriodComponent } from './thy-period.component';
import { ThyFormFieldModule } from '../thy-form-field/thy-form-field.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThyTranslateModule } from '../thy-translate/thy-translate.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThyPeriodSelectionComponent } from './thy-period-selection/thy-period-selection.component';
import { MatRadioModule } from '@angular/material/radio';
import { ThyDialogsModule } from '../thy-dialogs/thy-dialogs.module';



@NgModule({
  declarations: [ThyPeriodComponent, ThyPeriodSelectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    ThyDialogsModule,
    ThyFormFieldModule,
    ThyTranslateModule
  ],
  exports: [
    ThyPeriodComponent,
    ThyPeriodSelectionComponent
  ]
})
export class ThyPeriodModule { }
