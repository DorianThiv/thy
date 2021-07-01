import { ContentChild, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ThyListViewModel } from '../models/thy-list-view.class';

@Component({
  selector: 'thy-list-selection',
  templateUrl: './thy-list-selection.component.html',
  styleUrls: ['./thy-list-selection.component.scss']
})
export class ThyListSelectionComponent {
  
  @ViewChild('header') header;
  @ViewChild('matList') matList: MatSelectionList;
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  protected _list: ThyListViewModel[];
  @Input()
  get list(): ThyListViewModel[] { return this._list; }
  set list(value: ThyListViewModel[]) {
    this._list = value;
    this._viewModels = value;
  }

  @Input() title: string;
  @Input() icon: string;
  @Input() viewModel: any;
  @Input() style: object;
  @Input() selectable = true;
  @Input() editable = false;
  @Input() multiple = true;

  /**
   * Can use dialog instead of direct edition.
   * Subscribe to `add`, `edit`, `delete`, etc.. to get inside click event
   */
  @Input() editAsDialog = false;
  @Input() manageAutomatically = true;
  @Input() showHeader = false;
  @Input() showFieldset = true;

  @Input() styleFieldset: object;
  @Input() classFieldset = 'ui-g-12';

  // Context menu
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  @Input() menu: MatMenu;
  public contextMenuPosition = { x: 0, y: 0 };

  // Fieldset action menu
  @Input() actionMenu: MatMenu;

  @Output() selectionChange = new EventEmitter<ThyListViewModel[]>();
  @Output() listChange = new EventEmitter<ThyListViewModel[]>();
  @Output() add = new EventEmitter();
  @Output() validate = new EventEmitter<ThyListViewModel>();
  @Output() edit = new EventEmitter<ThyListViewModel>();
  @Output() cancel = new EventEmitter<ThyListViewModel>();
  @Output() delete = new EventEmitter<ThyListViewModel>();

  /**
   * @private `_selection` store the current selection.
   * This private property is accecible from calculated properties `selection`.
   */
  private _selection: ThyListViewModel[] = null;
  public get selection(): ThyListViewModel[] { return this._selection; }
  public set selection(value: ThyListViewModel[]) {
    if (this._selection) {
      this._selection.forEach(s => s.selected = false);
    }
    if (!value) {
      value = [];
    }
    if (value) {
      value.forEach(s => s.selected = true);
    }
    this._selection = value;
    this.selectionChange.emit(this._selection);
  }

  public get hasSelection(): boolean { return this.selection && this.selection.length > 0; }
  public get hasIcon(): boolean { return this.list && this.list.filter(m => m .icon).length > 0; }
  public get total(): number { return this.list ? this.list.length : 0; }
  public get action() { return this.editable ? 'add' : null; }
  public get valid() { return this.list.filter(e => e.editing === true).length > 0 ? false : true; }

  protected _viewModels: ThyListViewModel[];

  constructor() {
  }

  public filter(value?: string) {
    this._list = !value ? this._viewModels : this._viewModels.filter(m => m.name.indexOf(value) !== -1);
  }

  /**
   * Generic selection for any element have `selected` attribute.
   * Return `true` if selection has done and `false` in the other way.
   * Check if user click on specific icon (`more_vert`, `chevron_right`) to open a menu or expand parent.
   * Use to check the selection. If user select one element or more than one.
   */
  public onSelection(event: MatSelectionListChange): any {
    const value = (event.option.value as ThyListViewModel);
    value.selected = !value.selected;
    this.selectionChange.emit(event.option.value);
    this.listChange.emit(this.list);
  //   if (!element) { return false; }
  //   if (!event) {
  //     this.selection = [element];
  //     if (emitting) {
  //       this.selectionChange.emit(this.selection);
  //     }
  //     return true;
  //   }
  //   if (event.path && event.path[0] && (
  //     event.path[0].innerText === 'more_vert' ||
  //     event.path[0].innerText === 'check' ||
  //     event.path[0].innerText === 'expand_more' ||
  //     event.path[0].innerText === 'chevron_right')) { return false; }
  //   if (event.path && event.path[2] && event.path[2].localName === 'mat-checkbox') { return false; }
  //   if (event.shiftKey) {
  //     if (!this.selection) {
  //       this.selection = [element];
  //       return true;
  //     }
  //     const tmpIdx1 = this.list.indexOf((this.selection instanceof Array) ? this.selection[0] : this.selection);
  //     const tmpIdx2 = this.list.indexOf(element);
  //     const startIndex = tmpIdx1 < tmpIdx2 ? tmpIdx1 : tmpIdx2;
  //     const endIndex = tmpIdx1 < tmpIdx2 ? tmpIdx2 : tmpIdx1;
  //     if (startIndex !== -1 && endIndex !== -1) {
  //       const objects = this.list.filter((elem, idx) => idx >= startIndex && idx <= endIndex);
  //       this.selection = objects && tmpIdx1 > tmpIdx2 ? objects.reverse() : objects;
  //     }
  //   } else if (event.ctrlKey) {
  //     if (this.selection) {
  //       if (this.selection instanceof Array) {
  //         if (this.selection.indexOf(element) !== -1) {
  //           const objects = this.selection.slice();
  //           objects.splice(objects.indexOf(element), 1);
  //           this.selection = [].concat(objects);
  //         } else {
  //           this.selection = [].concat(this.selection, [element]);
  //         }
  //       } else {
  //         this.selection = element === this.selection ? null : [this.selection, element];
  //       }
  //     } else {
  //       this.selection = [element];
  //     }
  //   } else {
  //     this.selection = element.selected ? null : [element];
  //   }
  //   if (emitting) {
  //     this.selectionChange.emit(this.selection);
  //   }
  //   return true;
  // }

  // public onContextMenu(event: any, element?: ThyListViewModel | ThyListViewModel[], open = true) {
  //   if (!this.menu) { return; }
  //   if (!(element instanceof Array)) {
  //     if (element && !element.selected) {
  //       this.selection = [element];
  //     } else if (!this.contextMenu.menuOpen && !element) {
  //       this.selection = null;
  //     }
  //   }
  //   if (this.contextMenu) {
  //     event.preventDefault();
  //     this.contextMenuPosition.x = event.clientX;
  //     this.contextMenuPosition.y = event.clientY;
  //     if (open) {
  //       this.contextMenu.menuData = { element: this.selection instanceof Array ? this.selection.map(m => m) : this.selection ? this.selection : null };
  //       this.contextMenu.openMenu();
  //     }
  //   }
  }

  public onValid(item: ThyListViewModel) {
    item.editing = false;
    item.isNew = false;
    this.validate.emit(item);
    this.listChange.emit(this.list);
  }

  public onAdd() {
    if (this.viewModel) {
      if (this.manageAutomatically) {
        const newItem = new this.viewModel();
        if (!this.editAsDialog) {
          newItem.editing = true;
          newItem.isNew = true;
        }
        this.list.push(newItem);
        this.add.emit(newItem);
      } else {
        this.add.emit();
      }
    } else {
      this.add.emit();
    }
  }

  public onEdit(item: ThyListViewModel) {
    if (!this.editAsDialog) {
      item.editing = true;
    }
    this.edit.emit(item);
  }

  public onCancel(item: ThyListViewModel) {
    item.editing = false;
    if (item.isNew) {
      this.list.pop();
    }
  }

  public onDelete(item: ThyListViewModel) {
    if (this.manageAutomatically) {
      const idx = this.list.indexOf(item);
      if (idx !== -1) {
        this.list.splice(idx, 1);
      }
      this.listChange.emit(this.list);
    }
    this.delete.emit(item);
  }

}
