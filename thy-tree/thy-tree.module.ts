import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { ThyTreeExtendedComponent } from './thy-tree-extended/thy-tree-extended.component';
import { ThyTreeSimpleComponent } from './thy-tree-simple/thy-tree-simple.component';
import { ThyTranslateModule } from '../thy-translate/thy-translate.module';

@NgModule({
  declarations: [ThyTreeExtendedComponent, ThyTreeSimpleComponent],
  exports: [ThyTreeExtendedComponent, ThyTreeSimpleComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatMenuModule,
    ThyTranslateModule
  ]
})
export class ThyTreeModule { }
