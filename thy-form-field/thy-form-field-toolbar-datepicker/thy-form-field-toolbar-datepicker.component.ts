import { Component, OnInit, Input } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-thy-form-field-toolbar-datepicker',
  templateUrl: './thy-form-field-toolbar-datepicker.component.html',
  styleUrls: ['./thy-form-field-toolbar-datepicker.component.scss']
})
export class ThyFormFieldToolbarDatepickerComponent extends ThyFormFieldBase {

  @Input() formController = new FormControl();

  @Input() get value(): Date { return this.formController.value; }
  set value(value: Date) {
    this.formController.setValue(value);
  }

  constructor() {
    super();
  }

  public getClasses(): string[] {
    const classes = this.class ? this.class.split(' ') : [];
    return [].concat(classes, ['thy-toolbar-form-field thy-toolbar-item']);
  }

  public onValueChange() {
    if (this.useValue) {
      this.valueChange.emit(this.value);
    } else {
      this.valueChange.emit(this.formController.value);
    }
  }

}
