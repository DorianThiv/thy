import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ThySnackbarComponent } from './thy-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ThySnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  public open(data: MatSnackBarConfig) {
    const snackbarRef = this.snackbar.openFromComponent(ThySnackbarComponent, data);
    return snackbarRef;
  }

}
