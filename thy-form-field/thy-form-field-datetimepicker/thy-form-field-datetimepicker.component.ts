import { Component, Input } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { isMoment, Moment } from 'moment';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  set value(value: any) {
    if (value instanceof Date) {
    } else if (isMoment(value)) {
      value = (value as Moment).toDate();
    } else if (typeof(value) === 'string') {
      value = new Date(value);
    }
    this._value = this.toDateString(value);
    console.log(this.value);
  }

  constructor() {
    super();
  }

  private parseDate(date: string): Date {
    if (!date) { return null; }
    return moment(date).toDate();
  }

  private toDateString(date: Date): string {
    if (!date) { return null; }
    return moment(date).format('YYYY-MM-DDTHH:mm');
  }

  public onDateChange(value: string) {
    this.value = this.parseDate(value);
    this.valueChange.emit(this.value);
  }
  
}
