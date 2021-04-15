import { Component, Input } from '@angular/core';

@Component({
  selector: 'thy-grid-no-records',
  templateUrl: './thy-grid-no-records.component.html',
  styleUrls: ['./thy-grid-no-records.component.scss']
})
export class ThyGridNoRecordsComponent {

  @Input() label: string;

  constructor() { }

}
