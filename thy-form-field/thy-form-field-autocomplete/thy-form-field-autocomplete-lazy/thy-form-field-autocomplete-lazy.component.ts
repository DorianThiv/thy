import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ThyFormFieldAutocompleteComponent } from '../thy-form-field-autocomplete.component';

@Component({
  selector: 'thy-form-field-autocomplete-lazy',
  templateUrl: './thy-form-field-autocomplete-lazy.component.html',
  styleUrls: ['./thy-form-field-autocomplete-lazy.component.scss'],
})
export class ThyFormFieldAutocompleteLazyComponent extends ThyFormFieldAutocompleteComponent {

  protected _list: any[];
  @Input()
  set list(value: any[]) {
    console.log(value);
    this._list = value;
  }
  get list(): any[] {
    return this._list;
  }

  constructor() {
    super();
  }

  public onInputChange(value: string) {
    this.inputChange.emit(value);
  }

  public onDropdown() {
    this.clickDropdown.emit();
  }

}
