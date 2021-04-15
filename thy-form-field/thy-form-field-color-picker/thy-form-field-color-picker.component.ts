import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { ThyFormatService } from '../../../thy-services/thy-format/thy-format.service';
import { ThyFormFieldColorPickerService } from './thy-form-field-color-picker.service';


@Component({
  selector: 'app-thy-form-field-color-picker',
  templateUrl: './thy-form-field-color-picker.component.html',
  styleUrls: ['./thy-form-field-color-picker.component.scss']
})
export class ThyFormFieldColorPickerComponent extends ThyFormFieldBase {

  @Input()
  public get value(): string { return this.formatService.formatColorToRgba(this._value); }
  public set value(value: string) { this._value = this.formatService.formatColorToRgba(value); }

  @Input() alphaAsNull = false;

  @Input() defaultColor: string = null;

  @Input() showDeleteSuffix = true;

  public presets = this.service.presets;

  constructor(private service: ThyFormFieldColorPickerService, private formatService: ThyFormatService) {
    super();
  }

  public onChange(value: string) {
    const formated = this.alphaAsNull && this.service.isRgbaAlpha(value) ? null : this.formatService.formatColorToHex(value);
    this.valueChange.emit(formated);
    return formated;
  }

  public onDelete() {
    this.value = null;
    this.valueChange.emit(this.value);
  }

}
