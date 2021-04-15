import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ThyTranslateService } from '../../thy-translate';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-thy-form-field-datepicker',
  templateUrl: './thy-form-field-datepicker.component.html',
  styleUrls: [
    '../models/thy-form-elements.scss',
    './thy-form-field-datepicker.component.scss'
  ]
})
export class ThyFormFieldDatepickerComponent extends ThyFormFieldBase {

  /**
   * @property {FormControl} `formControl`
   * External formControl to bind data with specific controller.
   */
  @Input() formController: FormControl;

  @Input() required = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    if (this.formController && this._disabled) {
      this.formController.disable();
    }
  }
  get disabled(): boolean { return this._disabled; }

  @Output() closed = new EventEmitter<any>();

  constructor(private translateService: ThyTranslateService, private adapter: DateAdapter<any>) {
    super();
    this.adapter.setLocale(this.translateService.identifier);
  }

  public formatValue(value: Date) {
    return value ? value.toISOString().split('T')[0] : null;
  }

  public onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.valueChange.emit(event.value);
  }

  public onHtmlDateChange(date: Date) {
    this.valueChange.emit(date);
  }

}
