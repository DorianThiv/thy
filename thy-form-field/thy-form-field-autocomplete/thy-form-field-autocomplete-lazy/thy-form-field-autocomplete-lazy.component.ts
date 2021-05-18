import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete/autocomplete';
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
    this._list = value;
  }
  get list(): any[] {
    return this._list;
  }

  private _loading = false;
  private _isLoaded = false;
  public get loading(): boolean { return this._loading; }
  public set loading(value: boolean) {
    if (value) {
      this._isLoaded = false;
      setTimeout(() => {
        if (!this._isLoaded) {
          this._loading = true;
        }
      }, 500);
    } else {
      this._isLoaded = true;
      this._loading = false;
    }
  }

  constructor() {
    super();
  }

  public onEnter(value: any) {
    console.log(value);
    
  }

  public onInputChange(value: string) {
    this.inputChange.emit(value);
  }

  public onDropdown() {
    this.clickDropdown.emit();
  }

}
