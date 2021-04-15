import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCheckboxComponent } from './thy-checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThyTranslateModule } from '../../thy-services/thy-translate/thy-translate.module';



@NgModule({
  declarations: [ThyCheckboxComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    ThyTranslateModule
  ],
  exports: [
    ThyCheckboxComponent
  ]
})
export class ThyCheckboxModule { }
