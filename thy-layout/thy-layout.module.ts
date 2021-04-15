import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLayoutComponent } from './thy-layout.component';
import { ThyLayoutHorizontalComponent } from './thy-layout-horizontal/thy-layout-horizontal.component';
import { ThyLayoutVerticalComponent } from './thy-layout-vertical/thy-layout-vertical.component';
import { AngularSplitModule } from 'angular-split';
import { ThyLayoutNestedModule } from './thy-layout-nested/thy-layout-nested.module';


@NgModule({
  declarations: [
    ThyLayoutComponent,
    ThyLayoutHorizontalComponent,
    ThyLayoutVerticalComponent
  ],
  imports: [
    CommonModule,
    AngularSplitModule,
    ThyLayoutNestedModule
  ],
  exports: [
    ThyLayoutComponent,
    ThyLayoutHorizontalComponent,
    ThyLayoutVerticalComponent
  ]
})
export class ThyLayoutModule { }
