import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThyTranslateModule } from '../../thy-services/thy-translate/thy-translate.module';
import { ThyDialogsService } from './thy-dialogs.service';
import { ThyDialogsMessagesComponent } from './thy-dialogs-messages/thy-dialogs-messages.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ThyDialogsConfirmComponent } from './thy-dialogs-confirm/thy-dialogs-confirm.component';
import { ThyDialogsSourceComponent } from './thy-dialogs-source/thy-dialogs-source.component';
import { ThyDialogsLayoutComponent } from './thy-dialogs-layout/thy-dialogs-layout.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyFormFieldModule } from '../thy-form-field/thy-form-field.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    ThyFormFieldModule,
    ThyTranslateModule,
  ],
  providers: [ThyDialogsService],
  declarations: [
    ThyDialogsMessagesComponent,
    ThyDialogsConfirmComponent,
    ThyDialogsSourceComponent,
    ThyDialogsLayoutComponent
  ],
  exports: [
    ThyDialogsLayoutComponent
  ]
})
export class ThyDialogsModule { }
