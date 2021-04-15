import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyButtonComponent } from './thy-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThyTranslateModule } from '../../thy-services/thy-translate/thy-translate.module';



@NgModule({
  declarations: [ThyButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ThyTranslateModule
  ],
  exports: [ThyButtonComponent]
})
export class ThyButtonModule { }
