import { Component, Input } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'thy-form-field-datetimepicker',
  templateUrl: './thy-form-field-datetimepicker.component.html',
  styleUrls: [
    '../models/thy-form-elements.scss',
    './thy-form-field-datetimepicker.component.scss'
  ]
})
export class ThyFormFieldDatetimepickerComponent extends ThyFormFieldBase {

   protected _value: any;
   @Input()
   get value(): any { return this._value; }
   set value(value: any) { this._value = value; }

  public dateControl = new FormControl();

  constructor() {
    super();
  }

  private initialize(date: Date) {
    this.dateControl.setValue(date.toJSON());
  }

  public onDateChange(event: string) {
    // const date = event.value;
    // const splitted = this.time ? this.time.split(':') : null;
    // if (splitted) {
    //   date.setHours(!isNaN(Number(splitted[0])) ? Number(splitted[0]) : 0);
    //   date.setMinutes(!isNaN(Number(splitted[1])) ? Number(splitted[1]) : 0);
    // }
    console.log(event); 
    this.valueChange.emit(new Date(event));
  }
}
