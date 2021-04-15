import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyToolbarComponent } from './thy-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThyTranslateModule } from '../thy-translate/thy-translate.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThyToolbarMiniComponent } from './thy-toolbar-mini/thy-toolbar-mini.component';



@NgModule({
  declarations: [ThyToolbarComponent, ThyToolbarMiniComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ThyTranslateModule
  ],
  exports: [ThyToolbarComponent, ThyToolbarMiniComponent]
})
export class ThyToolbarModule { }
