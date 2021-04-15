import { Input, EventEmitter, Output, ViewChild, ElementRef, Directive } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatMenu } from '@angular/material/menu';

export enum ThyFormFieldType {
  Material,
  Partial,
  Unset
}

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class ThyFormFieldBase {

  @ViewChild('input') input: ElementRef;

  /**
   * @property `label`
   * Placeholder of matInput element.
   * It will be translate with `ThyTranslatePipe` if it's a known index.
   */
  @Input() label: string;

  /**
   * @property `labelDetails`
   * Add details to label like `(Ex: 0.00)`.
   */
  @Input() labelDetails: string;

  @Input() tooltipText: string;

  @Input() tooltipPosition: 'above' | 'below' | 'left' | 'right' | 'before' | 'after';

  /**
   * @property `name`
   * Property `name` of an HTML element. Must be set with the `ngModel` property.
   */
  @Input() name: string;

  /**
   * @property `title`
   * Property `title` of an HTML element. To show a simple tooltip.
   */
  @Input() title = '';

  /**
   * @property `type`
   * Property `type` of an input HTML element. To set type of the input.
   * @default type="text"
   */
  @Input() type: 'button' | 'checkbox' | 'color' | 'date' | 'datetime' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' = 'text';

  @Input() placeholder: string;

  @Input() color = 'accent';

  @Input() useValue = false;

  @Input() formFieldType = ThyFormFieldType.Material; 

  public formFieldTypes = ThyFormFieldType;

  /**
   * @property `disabled`
   * Property `disabled` of an HTML element. To disabled input.
   * @default disabled="false"
   */
  protected _disabled = false;
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) { this._disabled = value; }

  /**
   * @property `class`
   * Give a classes array to set personnal class.
   * @default 'ui-g-12'
   */
  @Input() class = 'ui-g-12';


  /**
   * @property `style`
   * CSS style tag.
   */
  @Input() style: any;


  /**
   * @deprecated
   * @property `classes`
   * Give a classes array to set personnal class.
   * @default ['ui-g-12']
   */
  @Input() classes = ['ui-g-12'];

  @Input() floatLabel: 'never';

  /**
   * Value of input. Use as ngModel
   * Link with `valueChange` EventEmitter.
   * @example [(value)]="value"
   */
  protected _value: any;
  @Input()
  get value(): any { return this._value; }
  set value(value: any) { this._value = value; }

  @Input() required = false;

  @Input() focused = false;

  @Input() readonly = false;

  @Input() noFormField = false;

  /**
   * Primary Suffix `mat-icon`.
   * @type string
   */
  @Input() suffix: string;

  /**
   * Second Suffix `mat-icon`.
   * @type string
   */
  @Input() suffixSec: string;

  @Input() suffixMenu: MatMenu;
  @Input() suffixDisabled = false;
  @Input() suffixSecDisabled = false;

  @Input() showSuffix = true;
  @Input() showSuffixSec = true;
  @Input() showDeleteSuffix = false;

  @Input() errorMatcher: ErrorStateMatcher;

  /**
   * Triggered when value property change.
   */
  @Output() valueChange = new EventEmitter<any>();

  /**
   * Select input field.
   */
  @Output() clickSelect = new EventEmitter();

  /**
   * Triggered when user click on suffix button.
   */
  @Output() clickSuffix = new EventEmitter();

  @Output() clickSuffixSec = new EventEmitter();

  /**
   * Triggered when user click on delete button.
   * By default it trigger valueChange with value = null.
   */
  @Output() clickDelete = new EventEmitter();

  /**
   * Triggered when value property change.
   */
  @Output() inputChange = new EventEmitter<string>();

  /**
   * Triggered on focusout event.
   */
  @Output() focusout = new EventEmitter<any>();

  public get cursorPosition(): number { return this.input ? this.input.nativeElement.selectionStart : 0; }

  public getClasses(): string[] {
    const classes = this.class ? this.class.split(' ') : [];
    return [].concat(classes, ['thy-form-field']);
  }

  public insert(position: number, content: string) {
    if (!this.value) {
      this.value = content;
      this.onValueChange();
      return;
    }
    if (!isNaN(position)) {
      this.value = [this.value.slice(0, position), content, this.value.slice(position)].join('');
    }
    this.valueChange.emit(this.value);
  }

  public replace(start: number, end: number, content: string) {
  }

  public onValueChange() {
    this.valueChange.emit(this.value);
    // if (this.type === 'number') {
    //   const value = this.value !== null && this.value !== undefined ? parseInt(this.value, 10) : this.value;
    //   this.valueChange.emit(!isNaN(value) ? value : null);
    // } else {
    //   this.valueChange.emit(this.value ? this.value : null);
    // }
  }

  public onSuffix(event: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.clickSuffix.emit();
  }

  public onSuffixSec(event: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.clickSuffixSec.emit();
  }

  public onDelete() {
    this.value = null;
    this.valueChange.emit(null);
    this.clickDelete.emit();
  }

  public onInputChange(value: string) {
    this.inputChange.emit(value);
  }

  public onFocusOut() {
    this.focusout.emit();
  }

}
