import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ThyDialogsMessagesComponent } from './thy-dialogs-messages/thy-dialogs-messages.component';
import { ThyDialogConfirmResponse, ThyDialogsConfirmComponent, IDialogMessage } from './thy-dialogs-confirm/thy-dialogs-confirm.component';
import { ThyPeriodComponent } from '../thy-period/thy-period.component';
import { ThyPeriodModel } from '../thy-period/models/thy-period-model.class';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ThyDialogsService {

  constructor(private matDialogService: MatDialog) { }

  public info(data: IDialogMessage, config?: MatDialogConfig<any>) {
    const dialogRef = this.matDialogService.open(ThyDialogsMessagesComponent, {
      width: config && config.width ? config.width : '400px',
      height: config && config.height ? config.height : undefined,
      maxWidth: config && config.maxWidth ? config.maxWidth : undefined,
      maxHeight: config && config.maxHeight ? config.maxHeight : undefined,
      data: data
    });
    return dialogRef.afterClosed();
  }

  public confirm(data: IDialogMessage): Observable<ThyDialogConfirmResponse> {
    const dialogRef = this.matDialogService.open(ThyDialogsConfirmComponent, {
      width: '400px',
      data: data
    });
    return dialogRef.afterClosed();
  }

  public password() {
    // const dialogRef = this.matDialogService.open(ThyDialogsChangePasswordComponent, {
    //   width: '600px'
    // });
    // return dialogRef.afterClosed();
  }

  public period(data?: { period?: ThyPeriodModel, compactPeriod?: string, options?: { showDefault?: boolean } }) {
    const dialogRef = this.matDialogService.open(ThyPeriodComponent, {
      width: '800px',
      data: data ? data : {}
    });
    return dialogRef.afterClosed();
  }

  /**
   * Generic methods to open any dialog component.
   * @param {any} component The dialog component
   * @param {MatDialogConfig} config His configuration `MatDialogConfig`
   * @returns An `Observable` triggered when dialog is closed.
   * @advices Set config.height to have fix size and resizable dialog
   */
  public resolve(component: any, config?: MatDialogConfig<any>): Observable<any> {
    if (config) {
      config.width = config.width ? config.width : '500px';
      config.disableClose = true;
      // config.maxHeight = '90%';
    }
    const dialogRef = this.matDialogService.open(component, config);
    return dialogRef.afterClosed();
  }

}
