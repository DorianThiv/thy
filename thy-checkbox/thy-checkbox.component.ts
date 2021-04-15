import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-thy-checkbox',
  templateUrl: './thy-checkbox.component.html',
  styleUrls: ['./thy-checkbox.component.scss']
})
export class ThyCheckboxComponent {

  @Input() label: string;

  @Input() class = 'ui-g-12';

  @Input() name: string;

  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>();

  public get classes(): string[] {
    const classes = this.class ? this.class.split(' ') : [];
    return [].concat(classes, ['thy-checkbox-container']);
  }

  constructor() { }

  public onValueChange(event: MatCheckboxChange) {
    this.valueChange.emit(event.checked);
  }

}
