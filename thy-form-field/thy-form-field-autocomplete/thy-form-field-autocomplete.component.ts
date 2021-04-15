import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ThyFormFieldBase } from '../models/thy-form-field.class';
import { FormControl } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'thy-form-field-autocomplete',
  templateUrl: './thy-form-field-autocomplete.component.html',
  styleUrls: ['./thy-form-field-autocomplete.component.scss']
})
export class ThyFormFieldAutocompleteComponent extends ThyFormFieldBase {

  @ViewChild('trigger', { static: false, read: MatAutocompleteTrigger }) trigger: MatAutocompleteTrigger;
  @ViewChild('auto', { static: false }) auto: MatAutocomplete;

  @Input() showDeleteSuffix = true;

  /**
   * @property {FormControl} `formControl`
   * External formControl to bind data with specific controller.
   */
  protected _formController = new FormControl();
  @Input()
  get formController(): FormControl { return this._formController; }
  set formController(formControl: FormControl) {
    if (formControl) {
      this._formController = formControl;
      this.filteredList = of(this.filter(null));
    }
  }

  @Input() displayWith = this.displayWithFunc;

  /**
   * @property {Observable<any[]>} `filteredModels`
   * Observable list to display content when user write in input autocomplete.
   */
  public filteredList: Observable<any[]>;

  /**
   * @property {Observable<any[]>} private `_list`
   * Simple list of models.
   */
  protected _list: any[];
  @Input() set list(list: any[]) {
    this._list = list;
    if (this.formController) {
      this.filteredList = of(this.filter(null));
    }
  }

  /**
   * @property `property`
   * Name of object property to display with.
   */
  @Input() property: string;

  @Input() displayValue: string;

  public get classesHtml(): string[] {
    const classes = this.class ? this.class.split(' ') : [];
    return [].concat('thy-html-input', classes);
  }

  constructor() {
    super();
  }

  protected filter(value: string) {
    if (!this._list || !value) { return this._list ? this._list : []; }
    if (typeof(value) === 'string') {
      const filterValue = value.toLowerCase();
      return this.property ? this._list.filter(ent => ent[this.property].toLowerCase().indexOf(filterValue) !== -1) : this._list.filter(ent => ent.toLowerCase().indexOf(filterValue) !== -1);
    }
  }

  public displayWithFunc(value: any) {
    if (!value) { return ''; }
    return typeof(value) === 'string' ? value : this.property ? value[this.property] : value['Name'];
  }

  public onInputChange(value: string) {
    this.filteredList = of(this.filter(value));
    if (!this.auto.isOpen) {
      this.trigger.openPanel();
    }
    this.inputChange.emit(value);
  }

  public onDropdown() {
    this.filteredList = of(this.filter(''));
    this.trigger.openPanel();
  }

  protected resizePanel() {
    // if (this.auto && this.auto.panel) {
    //   this.auto.panel.nativeElement.parentNode.style.width = 'auto';
    // }
  }

  public onOpenPane() {
    setTimeout(() => {
      this.resizePanel();
    });
  }

  public onDelete() {
    this.formController.setValue('');
    this.valueChange.emit(null);
  }
}
