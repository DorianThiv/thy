import { Component, Input } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/datepicker-input-base';
import { Moment } from 'moment';
import { isNullOrUndefined } from '../../thy-utils-functions/thy-utils-functions.service';

@Component({
  selector: 'thy-form-field-datetimepicker',
  templateUrl: './thy-form-field-datetimepicker.component.html',
  styleUrls: [
    '../models/thy-form-elements.scss',
    './thy-form-field-datetimepicker.component.scss'
  ]
})
export class ThyFormFieldDatetimepickerComponent extends ThyFormFieldBase {

  @Input()
  set value(value: Date) {
    this._value = typeof(value) === 'string' ? new Date(value) : value;
    this.setTime(this._value);
  }

  public time: string;

  constructor() {
    super();
  }

  private setTime(value: Date) {
    if (value) {
      const minutes = value.getMinutes();
      const hours = value.getHours();
      this.time = `${minutes < 10 ? `0${minutes}` : minutes}:${hours < 10 ? `0${hours}` : hours}`;
    }
  }

  private setTimeToDate(date: Date) {
    if (date && this.time) {
      const splitted = this.time ? this.time.split(':') : null;
      const minutes = !isNullOrUndefined(splitted[0]) ? Number(splitted[0]) : 0;
      const hours = !isNullOrUndefined(splitted[1]) ? Number(splitted[1]) : 0;
      date.setMinutes(minutes);
      date.setHours(hours);
    }
  }


  public onDateChange(event: MatDatepickerInputEvent<Moment>) {
    const date = event.value.toDate();
    this.setTimeToDate(date);
    this.valueChange.emit(date);
  }
  public onTimeChange() {
    this.setTimeToDate(this.value);
  }
}
