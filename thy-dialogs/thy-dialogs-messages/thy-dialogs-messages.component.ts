import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogMessage } from '../thy-dialogs-confirm/thy-dialogs-confirm.component';

@Component({
  selector: 'app-thy-dialogs-messages',
  templateUrl: './thy-dialogs-messages.component.html',
  styleUrls: ['./thy-dialogs-messages.component.scss']
})
export class ThyDialogsMessagesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: IDialogMessage) {
  }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }

}
