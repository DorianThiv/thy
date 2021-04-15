import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';

@Component({
  selector: 'thy-form-field-toolbar-input',
  templateUrl: './thy-form-field-toolbar-input.component.html',
  styleUrls: ['./thy-form-field-toolbar-input.component.scss']
})
export class ThyFormFieldToolbarInputComponent extends ThyFormFieldBase {

  constructor() {
    super();
  }

  public getClasses(): string[] {
    const classes = this.class ? this.class.split(' ') : [];
    return [].concat(classes, ['thy-toolbar-form-field thy-toolbar-item']);
  }

  public onValueChange2(event: any) {
    this.valueChange.emit(event.target.value);
  }

}
