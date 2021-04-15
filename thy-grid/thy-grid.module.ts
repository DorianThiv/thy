import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyGridNoRecordsComponent } from './thy-grid-no-records/thy-grid-no-records.component';
import { ThyTranslateModule } from '../../thy-services/thy-translate/thy-translate.module';



@NgModule({
  declarations: [ThyGridNoRecordsComponent],
  imports: [
    CommonModule,
    ThyTranslateModule
  ],
  exports: [ThyGridNoRecordsComponent]
})
export class ThyGridModule { }
