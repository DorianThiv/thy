import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFileImportComponent } from './thy-file-import.component';
import { ThyTranslateModule } from '../thy-translate/thy-translate.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThyDialogsModule } from '../thy-dialogs/thy-dialogs.module';



@NgModule({
  declarations: [ThyFileImportComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ThyTranslateModule,
    ThyDialogsModule
  ],
  exports: [ThyFileImportComponent],
})
export class ThyFileImportModule { }
