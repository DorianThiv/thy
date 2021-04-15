import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThyTranslateService } from '../../thy-translate';
import { ThyFormFieldBase } from '../models/thy-form-field.class';

@Component({
  selector: 'thy-form-field-input',
  templateUrl: './thy-form-field-input.component.html',
  styleUrls: ['./thy-form-field-input.component.scss']
})
export class ThyFormFieldInputComponent extends ThyFormFieldBase {

  @Output() inputChange = new EventEmitter<any>();

  /**
   * For input with type `number`.
   * Minimum value to show.
   */
  @Input() min: number;

  /**
   * For input with type `number`.
   * Maximum value to show.
   */
  @Input() max: number;

  public get lang(): string { return this.translateService.identifier; }

  constructor(private translateService: ThyTranslateService) {
    super();
  }

  public onInputChange(value: string) {
    this.inputChange.emit(value);
  }

}
