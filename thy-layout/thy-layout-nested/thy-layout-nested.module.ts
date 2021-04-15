import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLayoutNestedComponent } from './thy-layout-nested.component';
import { AngularSplitModule } from 'angular-split';



@NgModule({
  declarations: [ThyLayoutNestedComponent],
  imports: [
    CommonModule,
    AngularSplitModule
  ],
  exports: [ThyLayoutNestedComponent]
})
export class ThyLayoutNestedModule { }
