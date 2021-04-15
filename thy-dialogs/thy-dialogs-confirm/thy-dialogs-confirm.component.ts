import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface IDialogMessage {
  title?: string;
  message?: string;
  details?: string | string[];
}

export interface ThyDialogConfirmResponse {
  data: IDialogMessage,
  response: 'yes' | 'no';
}

@Component({
  selector: 'app-thy-dialogs-confirm',
  templateUrl: './thy-dialogs-confirm.component.html',
  styleUrls: ['./thy-dialogs-confirm.component.scss']
})
export class ThyDialogsConfirmComponent {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: IDialogMessage) { }

  public validate() {
    this.dialogRef.close({ data: this.data, response: 'yes' })
  }

  public close() {
    this.dialogRef.close({ data: this.data, response: 'no' });
  }

}
