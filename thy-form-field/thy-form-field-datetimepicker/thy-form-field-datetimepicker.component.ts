import { Component, Input } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { FormControl } from '@angular/forms';
import { ThyTranslateService } from '../../../thy-services/thy-translate';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-thy-form-field-datetimepicker',
  templateUrl: './thy-form-field-datetimepicker.component.html',
  styleUrls: [
    '../models/thy-form-elements.scss',
    './thy-form-field-datetimepicker.component.scss'
  ]
})
export class ThyFormFieldDatetimepickerComponent extends ThyFormFieldBase {

  /**
   * Principal date conatins date and time.
   */

  @Input() set value(value: Date) {
    if (value) {
      this.initialize(value);
    }
  }

  public dateControl = new FormControl();
  public time: string;

  constructor(private translateService: ThyTranslateService, private adapter: DateAdapter<any>) {
    super();
  }

  private initialize(date: Date) {
    const hours = date.getHours() ? date.getHours() : 0;
    const minutes = date.getMinutes() ? date.getMinutes() : 0;
    this.time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    this.dateControl.setValue(date);
  }

  public onDateChange(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    const splitted = this.time ? this.time.split(':') : null;
    if (splitted) {
      date.setHours(!isNaN(Number(splitted[0])) ? Number(splitted[0]) : 0);
      date.setMinutes(!isNaN(Number(splitted[1])) ? Number(splitted[1]) : 0);
    }
    this.valueChange.emit(date);
  }

  public onTimeChange() {
    const date = this.dateControl.value;
    const splitted = this.time ? this.time.split(':') : null;
    if (splitted) {
      date.setHours(!isNaN(Number(splitted[0])) ? Number(splitted[0]) : 0);
      date.setMinutes(!isNaN(Number(splitted[1])) ? Number(splitted[1]) : 0);
    }
    this.valueChange.emit(date);
  }
}
