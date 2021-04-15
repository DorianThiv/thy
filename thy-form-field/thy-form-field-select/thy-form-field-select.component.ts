import { Component, Input } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { ThyFormFieldSelectOption } from './thy-form-field-select-option.class';
import { ThyFormFieldSelectTrigger } from './thy-form-field-select-trigger.class';

@Component({
  selector: 'app-thy-form-field-select',
  templateUrl: './thy-form-field-select.component.html',
  styleUrls: [
    '../models/thy-form-elements.scss',
    './thy-form-field-select.component.scss'
  ]
})
export class ThyFormFieldSelectComponent extends ThyFormFieldBase {

  @Input() triggers: ThyFormFieldSelectTrigger[];
  @Input() options: ThyFormFieldSelectOption[];

  constructor() {
    super();
  }

}
