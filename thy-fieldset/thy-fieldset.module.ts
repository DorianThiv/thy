import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFieldsetComponent } from './thy-fieldset.component';
import { ThyTranslateModule } from '../../thy-services/thy-translate/thy-translate.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [ThyFieldsetComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ThyTranslateModule
  ],
  exports: [ThyFieldsetComponent]
})
export class ThyFieldsetModule { }
