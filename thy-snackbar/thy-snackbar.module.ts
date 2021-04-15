import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySnackbarComponent } from './thy-snackbar.component';
import { ThyTranslateModule } from '../thy-translate/thy-translate.module';

@NgModule({
  declarations: [ThySnackbarComponent],
  imports: [
    CommonModule,
    ThyTranslateModule
  ]
})
export class ThySnackbarModule { }
