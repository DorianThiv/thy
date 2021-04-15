import { ViewChild, Input, Output, EventEmitter, HostListener, Directive } from '@angular/core';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Sort } from '@angular/material/sort';
import { ThyGridExportOptions } from './models/thy-grid-export-options.interface';
import { ThyGridViewModel3 } from './models/thy-grid-view3.class';
import { ThyObjectType } from '../thy-objects/thy-types.class';
import { ThyUtilsFunctionsService } from '../thy-utils-functions/thy-utils-functions.service';

enum DragOverPosition {
  None,
  Top,
  Middle,
  Bottom
}

@Directive()
export abstract class ThyGrid {

    @ViewChild('table') table: any;
    @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

    // Inputs
    @Input() height: number;
    @Input() menu: MatMenu;

    // Options
    @Input() multiple = true;
    @Input() cells = false;

    // Outputs
    @Output() selectionChange = new EventEmitter<ThyGridViewModel3[]>();
    @Output() doubleClickChange = new EventEmitter<ThyGridViewModel3[]>();

    /**
     * @property Allow by user roles.
     */
    public canManage: boolean;

    // Properties to manage grid.
    public dataSource = new MatTableDataSource<ThyGridViewModel3>([]);
    public columns: string[] = ['name'];
    public loading: boolean;
    public loadingAttributesPercents: { value: number };
    public contextMenuPosition = { x: 0, y: 0 };

    /**
     * Store a flat list of view models.
     */
    protected viewModels: any[] = [];

    /**
     * @private `_selection` store the current selection.
     * This private property is accecible from calculated properties `selection`.
     */
    private _selection: ThyGridViewModel3[] = [];
    public get selection(): ThyGridViewModel3[] { return !this._selection ? [] : this._selection; }
    public set selection(value: ThyGridViewModel3[]) {
      if (this._selection) {
        this._selection.forEach(element => element.selected = false);
      }
      if (value) {
        value.forEach(element => element.selected = true);
      }
      this._selection = value;
    }

    /**
     * Cell selected
     */
    private _cell = null;
    public get cell(): any { return this._selection ? this._selection : null; }
    public set cell(value: any) {
      if (this._cell) {
        this._cell.style.boxShadow = '';
      }
      if (value) {
        value.style.boxShadow = 'inset 0px 0px 2px #000';
      }
      this._cell = value;
    }

    /**
     * Return total of elements in grid. Even the grid is filtred.
     */
    public get total(): number { return this.dataSource && this.dataSource.filteredData ? this.dataSource.filteredData.length : 0; }

    /**
     * If the multi selection is activate.
     */
    public get isSelectionMode(): boolean { return this.columns[0] === 'check' ? true : false; }

    /**
     * If one element is selected in grid.
     */
    public get isThereASelection(): boolean { return this.selection.length === 0 ? false : true; }

    public isDragMode = true;
    private _draggingElements: any[];
    private _lastOverRow: HTMLTableRowElement;
    private _lastOverPosition: DragOverPosition;

    protected _filterTime: number;

    protected _attempt = 0;

    constructor() {
    }

    //#region [Data]

    /**
     * Initialize data of component.
     */
    public abstract initialize(...args: any[]): void;

    /**
     * Refresh the current table with `ThyRefreshEvent` event from notifications service.
     * @param event `ThyRefreshEvent` contain refresh type (`type`), entity type (`objectType`) and entity id (`id`).
     */
    public abstract refresh(event?: any): void;

    public async refreshHard() {
      throw new Error('[ThyGridTyped - refreshHard] Not implemented.');
    }

    //#endregion

    //#region [Sort]

    /**
     * Bind on HTML.
     * Use to sort data in a grid.
     * Call service's `sort()` method to apply a specific sort
     * @param {Sort} sort
     */
    public sortData(sort: Sort) {
      const data = this.dataSource.data.slice();
      if (!sort.active || sort.direction === '') {
        this.initialize();
        return;
      }
      this.dataSource.data = data.sort((a, b) => this.sort(sort, a, b));
    }

    public sort(sort: Sort, a: any, b: any) {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.sortString(a.Name, b.Name, isAsc);
        default: return 0;
      }
    }

    protected sortString(a: string, b: string, isAsc: boolean) {
      let ret;
      if (!a) { ret = -1; } else if (!b) { ret = 1; } else {
        a = a.toLowerCase();
        b = b.toLowerCase();
        ret = (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      }
      return ret;
    }

    protected sortNumber(a: number, b: number, isAsc: boolean) {
      if (a === undefined || a === null) { return -1; } else if (b === undefined || b === null) { return 1; } else {
        const _a = typeof(a) === 'string' ? Number(a) : a;
        const _b = typeof(b) === 'string' ? Number(b) : b;
        return (_a < _b ? -1 : 1) * (isAsc ? 1 : -1);
      }
    }

    protected sortDate(a: Date, b: Date, isAsc: boolean) {
      if (!a) { return 1; } else if (!b) { return -1; }
      return isAsc ? b.getTime() - a.getTime() : a.getTime() - b.getTime();
    }

    //#endregion

    //#region [Filter]

    /**
     * Bind on HTML.
     * Use to filter data in a grid.
     * Call service's `filter()` method specify in `this.dataSource.filterPredicat()`
     * @param {string} filterValue
     */
    public applyFilter(filterValue: string) {
      this._attempt++;
      const cpt = this._attempt;
      this.timeout(cpt, filterValue);
    }

    protected timeout(c, filterValue) {
      setTimeout(() => {
        if (c === this._attempt) {
          if (this.dataSource) {
            this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
          }
        }
      }, this._filterTime);
    }

    protected filter(vm: any, filterValue: string) {
      const name = vm.Name ? vm.Name : '';
      if (name.trim().toLocaleLowerCase().indexOf(filterValue) !== -1) {
          return true;
      }
      return false;
    }

    //#endregion

    //#region [Optimisation]

    public trackById(index: number, item: any) {
      return item.Id;
    }

    //#endregion

    //#region [Actions]

    public select(id: number, type: ThyObjectType) {
      if (id && type && this.dataSource && this.dataSource.data) {
        const selectedElement = this.selection.find(d => d.Id === id && d.EntityType === type);
        if (!selectedElement) {
          const element = this.dataSource.data.find(d => d.Id === id && d.EntityType === type);
          if (element) {
            this.selection = [element];
            setTimeout(() => ThyUtilsFunctionsService.makeSelectionVisible(this.table, this.dataSource.data, element), 1);
          }
        }
      }
    }

    //#endregion

    //#region [User Events]

    public onMenu(element: any) {
    }

    public onShowCheckbox() {
      this.selection = null;
      if (this.columns[0] !== 'check') {
        this.columns.unshift('check');
      } else {
        this.columns.shift();
      }
    }

    public onSelectionAll(event: MatCheckboxChange) {
      if (this.selection) {
        this.selection = null;
      } else {
        this.selection = event.checked ? this.dataSource.data : null;
      }
    }

    /**
     * Generic selection for any element have `selected` attribute.
     * Return `true` if selection has be done and `false` in other way.
     */
    public onSelection(event: any, element: any, emitting = false): any {
      if (!element) { return false; }
      if (!event) {
        this.selection = element;
        if (emitting) {
          this.selectionChange.emit(this.selection);
        }
        return true;
      }
      if (event.path && event.path[0] && (
        event.path[0].innerText === 'more_vert' ||
        event.path[0].innerText === 'check' ||
        event.path[0].innerText === 'expand_more' ||
        event.path[0].innerText === 'chevron_right')) { return false; }
      if (event.path && event.path[2] && event.path[2].localName === 'mat-checkbox') { return false; }
      if (this.multiple && event.shiftKey) {
        if (!this.selection) {
          this.selection = element;
          return true;
        }
        const tmpIdx1 = this.dataSource.data.indexOf((this.selection instanceof Array) ? this.selection[0] : this.selection);
        const tmpIdx2 = this.dataSource.data.indexOf(element);
        const startIndex = tmpIdx1 < tmpIdx2 ? tmpIdx1 : tmpIdx2;
        const endIndex = tmpIdx1 < tmpIdx2 ? tmpIdx2 : tmpIdx1;
        if (startIndex !== -1 && endIndex !== -1) {
          const objects = this.dataSource.data.filter((elem, idx) => idx >= startIndex && idx <= endIndex);
          this.selection = objects && tmpIdx1 > tmpIdx2 ? objects.reverse() : objects;
        }
      } else if (this.multiple && (event.ctrlKey || (event instanceof MatCheckboxChange))) {
        if (this.selection) {
          if (this.selection instanceof Array) {
            if (this.selection.indexOf(element) !== -1) {
              const objects = this.selection.slice();
              objects.splice(objects.indexOf(element), 1);
              this.selection = [].concat(objects);
            } else {
              this.selection = [].concat(this.selection, [element]);
            }
          } else {
            this.selection = element === this.selection ? null : [this.selection, element];
          }
        } else {
          this.selection = element;
        }
      } else {
        this.selection = element.selected ? null : element;
      }
      if (emitting) {
        this.selectionChange.emit(this.selection);
      }
      return true;
    }

    public onContextMenu(event: any, element?: any, open = true) {
      // if (!this.menu) { return; }
      if (element && !element.selected) {
        this.selection = element;
      } else if (!this.contextMenu.menuOpen && !element) {
        this.selection = null;
      }
      if (this.cells) {
        this.cell = event.target;
      }
      if (this.contextMenu) {
        event.preventDefault();
        this.contextMenuPosition.x = event.clientX;
        this.contextMenuPosition.y = event.clientY;
        if (open) {
          this.contextMenu.menuData = { element: this.selection };
          this.contextMenu.openMenu();
        }
      }
    }

    public onDoubleClick(...args: any[]) {
    }

    public onCellSelection(event: any, ...args: any[]) {
      if (this.cells) {
        this.cell = event.target;
      }
    }

    /**
     * @todo Drag and drop one or more elements, listen `escape` key if user cancel drag action.
     * @param event
     */
    public onDragStart(event: DragEvent, element: ThyGridViewModel3) {
      // console.log('start', event, this.selection instanceof Array ? this.selection : element);
    }

    public onDragOver(event: any, element: ThyGridViewModel3) {
      event.preventDefault();
      let overPosition: DragOverPosition;
      const row = event.path[0].parentElement;
      const height = row.offsetHeight;
      if (event.offsetY <= height * 0.2) {
        overPosition = DragOverPosition.Top;
        row.style.borderTop = '2px solid rgb(170, 50, 220, .6)';
      } else if (event.offsetY >= height * 0.8) {
        overPosition = DragOverPosition.Middle;
        row.style.borderBottom = '2px solid rgb(170, 50, 220, .6)';
      } else {
        overPosition = DragOverPosition.Bottom;
      }
      if (this._lastOverPosition !== overPosition) {
        this._lastOverPosition = overPosition;
        if (this._lastOverRow) {
          this._lastOverRow.style.borderTop = '';
          this._lastOverRow.style.borderBottom = '';
        } else if (row) {
          row.style.borderTop = '';
          row.style.borderBottom = '';
        }
      }
      this._lastOverRow = row;
    }

    public onDrop(event: any, element?: any) {
      const height = event.path[0].parentElement.offsetHeight;
      if (event.offsetY <= height * 0.2 || event.offsetY >= height * 0.8) {
        console.log(`Find parent of ${element.Name}`);
      } else {
        console.log(`Set ${this._draggingElements} into children of ${element.Name}`);
      }
      this._draggingElements = null;
      this._lastOverPosition = DragOverPosition.None;
      this._lastOverRow.style.borderTop = '';
      this._lastOverRow.style.borderBottom = '';
      this._lastOverRow = null;
    }

    public onExport(options?: ThyGridExportOptions) {
      if (!options || !options.properties || !options.fileSaver) { return; }
      let csv = '';
      const titles = options.titles ? options.titles.join(options.delimiter) : options.properties.join(options.delimiter);
      csv += titles + `\r\n`;
      this.dataSource.data.forEach((d) => {
        for (const property of options.properties) {
          const value = `${d[property] ? d[property] : ''}`;
          csv += `"${this.formatStringForCsv(value)}"${options.delimiter}`;
        }
        csv += `\r\n`;
      });
      if (csv) {
        options.fileSaver.save(csv, options.filename ? options.filename : 'thy-grid', 'csv');
      }
    }

    protected formatStringForCsv(s: string) {
      if (!s) { return ''; }
      if (typeof(s) === 'string') {
        s = s.replace(/(\r\n|\n|\r)/gm, ' ');
      }
      return s;
    }

    //#endregion

    @HostListener('window:keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    }

}
