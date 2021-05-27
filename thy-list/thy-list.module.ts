import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyListComponent } from './thy-list.component';
import { ThyFieldsetModule } from '../thy-fieldset/thy-fieldset.module';
import { ThyFormFieldModule } from '../thy-form-field/thy-form-field.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThyListCustomComponent } from './thy-list-custom/thy-list-custom.component';
import { ThyListVirtualComponent } from './thy-list-virtual/thy-list-virtual.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { ThyListSelectionComponent } from './thy-list-selection/thy-list-selection.component';

@NgModule({
  declarations: [ThyListComponent, ThyListCustomComponent, ThyListVirtualComponent, ThyListSelectionComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ThyFieldsetModule,
    ThyFormFieldModule
  ],
  exports: [ThyListComponent, ThyListCustomComponent, ThyListVirtualComponent, ThyListSelectionComponent]
})
export class ThyListModule { }
