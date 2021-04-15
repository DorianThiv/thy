import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { FormControl } from '@angular/forms';
import { ThyTranslateService } from '../../../thy-services/thy-translate';

@Component({
  selector: 'app-thy-form-field-control',
  templateUrl: './thy-form-field-control.component.html',
  styleUrls: [
    '../models/thy-form-elements.scss',
    './thy-form-field-control.component.scss'
  ]
})
export class ThyFormFieldControlComponent extends ThyFormFieldBase {

  /**
   * @property {FormControl} `formControl`
   * External formControl to bind data with specific controller.
   */
  @Input() formController = new FormControl();

  @Input() required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value;
    if (this.formController && this._disabled) {
      this.formController.disable();
    }
  }

  constructor(private translateService: ThyTranslateService) {
    super();
  }

  public getErrorMessage() {
    return this.formController.hasError('required') ? this.translateService.instant('@error-this-field-required') : '';
  }
}
