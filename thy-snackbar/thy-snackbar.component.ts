import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-thy-snackbar',
  templateUrl: './thy-snackbar.component.html',
  styleUrls: ['./thy-snackbar.component.scss']
})
export class ThySnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data);
  }

}
