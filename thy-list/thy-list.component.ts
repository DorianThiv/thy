import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThyListGenericViewModel } from './models/thy-list-generic-view.class';
import { ThyListViewModel } from './models/thy-list-view.class';

@Component({
  selector: 'thy-list',
  templateUrl: './thy-list.component.html',
  styleUrls: ['./thy-list.component.scss']
})
export class ThyListComponent<T extends { Id: number, Name: string }> {

  @Input() title: string;
  @Input() icon: string;
  @Input() list: ThyListGenericViewModel<T>[];
  @Input() style: object;
  @Input() editable = true;

  @Input() autocompleteLabel: string;
  @Input() autocompleteList: any[];
  @Input() autocompleteProperty: string;
  @Input() autocompleteStyle = { 'display': 'block', 'font-size': '12px' };

  @Input() fieldsetStyle: object;
  @Input() fieldsetClass = 'ui-g-12';

  @Output() add = new EventEmitter();
  @Output() validate = new EventEmitter<ThyListGenericViewModel<T>>();
  @Output() edit = new EventEmitter<ThyListGenericViewModel<T>>();
  @Output() cancel = new EventEmitter<ThyListGenericViewModel<T>>();
  @Output() delete = new EventEmitter<ThyListGenericViewModel<T>>();

  public get action() { return this.editable ? 'add' : null; }

  public get valid() { return this.list.filter(e => e.editing === true).length > 0 ? false : true; }

  constructor() { }

  public onChange(item: ThyListGenericViewModel<T>, model: T) {
    if (model instanceof Object) {
      item.model = model;
      item.editing = false;
      item.isNew = false;
      this.validate.emit(item);
    }
  }

  public onAdd() {
    const newItem = new ThyListGenericViewModel<T>();
    newItem.editing = true;
    newItem.isNew = true;
    this.list.push(newItem);
    this.add.emit();
  }

  public onEdit(item: ThyListGenericViewModel<T>) {
    item.editModel = null;
    item.editing = true;
    this.cancel.emit(item);
  }

  public onValid(item: ThyListGenericViewModel<T>) {
    item.model = item.editModel;
    item.editing = false;
    item.isNew = false;
    this.validate.emit(item);
  }

  public onCancel(item: ThyListGenericViewModel<T>) {
    item.editModel = null;
    item.editing = false;
    if (item.isNew) {
      this.list.pop();
    }
    this.edit.emit(item);
  }

  public onDelete(item: ThyListGenericViewModel<T>) {
    const idx = this.list.indexOf(item);
    if (idx !== -1) {
      this.list.splice(idx, 1);
    }
    this.delete.emit(item);
  }


}
