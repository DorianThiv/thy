import { Component, Input } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';

@Component({
  selector: 'thy-form-field-textarea',
  templateUrl: './thy-form-field-textarea.component.html',
  styleUrls: [
    '../models/thy-form-elements.scss',
    './thy-form-field-textarea.component.scss'
  ]
})
export class ThyFormFieldTextareaComponent extends ThyFormFieldBase {

  @Input() rows: number;

  constructor() {
    super();
  }

  public getClasses() {
    const classes = [].concat(this.class ? this.class.split(' ') : [], ['thy-form-field-wrapper']);
    return classes;
  }

}
