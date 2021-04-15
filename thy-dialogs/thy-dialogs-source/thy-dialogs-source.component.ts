import { Component, ElementRef, ViewChild, HostListener, AfterContentInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ThyObjectType, ThyConversionFunctionsStr } from '../../../thy-services/thy-objects/thy-types.class';
import { FormControl } from '@angular/forms';
import { ThyNatures2Service } from '../../../../thy-public/thy-natures/thy-natures2.service';
import { ThyTrends2Service } from '../../../../thy-public/thy-trends/thy-trends2.service';
import { ThyPoints2Service } from '../../../../thy-public/thy-points/thy-points2.service';
import { ThyMeters2Service } from '../../../../thy-public/thy-meters/thy-meters2.service';
import { ThyLocations2Service } from '../../../../thy-public/thy-locations/thy-locations2.service';
import { ThyGroups2Service } from '../../../../thy-public/thy-groups/thy-groups2.service';
import { ThyNatureModel } from '../../../../thy-public/thy-natures/models/thy-nature-model.class';
import { ThyPointViewModel } from '../../../../thy-public/thy-points/models/thy-point-view.class';
import { ThyPointModel } from '../../../../thy-public/thy-points/models/thy-point-model.class';
import { ThyTrendViewModel } from '../../../../thy-public/thy-trends/models/thy-trend-view.class';
import { ThyTrendModel } from '../../../../thy-public/thy-trends/models/thy-trend-model.class';
import { ThyMeterModel } from '../../../../thy-public/thy-meters/models/thy-meter-model.class';
import { ThyMeterViewModel } from '../../../../thy-public/thy-meters/models/thy-meter-view.class';
import { ThyLocationModel } from '../../../../thy-public/thy-locations/models/thy-location-model.class';
import { ThyLocationViewModel } from '../../../../thy-public/thy-locations/models/thy-location-view.class';
import { ThyGroupModel } from '../../../../thy-public/thy-groups/models/thy-group-model.class';
import { ThyGroupViewModel } from '../../../../thy-public/thy-groups/models/thy-group-view.class';
import { ThyBaseConfigurationComponent } from '../../thy-base/thy-base-configuration/thy-base-configuration.component';
import { ThyBaseViewModel } from '../../thy-base/models-view/thy-base-view.class';
import { ThyBaseTree2Service } from '../../thy-base/thy-base-tree2.service';
import { ThyBaseDto } from '../../thy-base/models-base/thy-base-dto.class';
import { ThyBaseModel } from '../../thy-base/models-base/thy-base-model.class';
import { BuildReferenceOptions } from '../../thy-base/thy-base2.service';
import { ThyBaseTreeViewModel } from '../../thy-base/models-view/thy-base-tree-view.class';
import { ThyPeriodState, ThyPeriodService } from '../../thy-period/thy-period.service';
import { ThyFormFieldSelectOption } from '../../thy-form-field/thy-form-field-select/thy-form-field-select-option.class';
import { isNullOrUndefined } from '../../../thy-services/thy-utils-functions/thy-utils-functions.service';
import { Observable } from 'rxjs/internal/Observable';

interface ThySelectionType {
  name: string;
  type: number;
  enable: boolean;
}

export class ThySourceResponse {
  public id: number;
  public type: number;
  public natureId: number;
  public reference: string;
  public model: ThyBaseModel<ThyBaseDto>;

  constructor(obj: any) {
    this.id = obj.id;
    this.type = obj.type;
    this.natureId = obj.natureId;
    this.reference = obj.reference;
    this.model = obj.model;
  }

}

@Component({
  selector: 'app-thy-dialogs-source',
  templateUrl: './thy-dialogs-source.component.html',
  styleUrls: ['../../../thy-styles/thy-theme-blue.scss', './thy-dialogs-source.component.scss']
})
export class ThyDialogsSourceComponent extends ThyBaseConfigurationComponent implements AfterContentInit {

  @ViewChild('content', {static: false}) content: ElementRef;
  @ViewChild('header', {static: false}) header: ElementRef;

  // public types: ThySelectionType[] = [
  //   {
  //     name: '@global-points',
  //     type: ThyObjectType.Point,
  //     enable: true
  //   }, {
  //     name: '@global-trends',
  //     type: ThyObjectType.Trend,
  //     enable: true
  //   }, {
  //     name: '@global-meters',
  //     type: ThyObjectType.Meter,
  //     enable: true
  //   }, {
  //     name: '@global-locations',
  //     type: ThyObjectType.Location,
  //     enable: true
  //   }, {
  //     name: '@global-groups',
  //     type: ThyObjectType.Group,
  //     enable: true
  //   },
  // ];

  public types: ThyFormFieldSelectOption[] = [
    new ThyFormFieldSelectOption('@global-points', ThyObjectType.Point),
    new ThyFormFieldSelectOption('@global-trends', ThyObjectType.Trend),
    new ThyFormFieldSelectOption('@global-meters', ThyObjectType.Meter),
    new ThyFormFieldSelectOption('@global-locations', ThyObjectType.Location),
    new ThyFormFieldSelectOption('@global-groups', ThyObjectType.Group)
  ];

  public convertionOptions: ThyFormFieldSelectOption[] = [
    new ThyFormFieldSelectOption('@global-none', ''),
    new ThyFormFieldSelectOption('@global-primary', 'Primary'),
    new ThyFormFieldSelectOption('@global-carbon', 'Carbon'),
    new ThyFormFieldSelectOption('@global-cost', 'Cost'),
    new ThyFormFieldSelectOption('@global-area', 'Area'),
    new ThyFormFieldSelectOption('@global-unitPrice', 'UnitPrice'),
  ];

  public functionOptions: ThyFormFieldSelectOption[] = [
    new ThyFormFieldSelectOption('@global-none',  ''),
    new ThyFormFieldSelectOption('@global-average', 'Avg'),
    new ThyFormFieldSelectOption('@global-minimum', 'Min'),
    new ThyFormFieldSelectOption('@global-maximum', 'Max'),
  ];

  public periodOptions: ThyFormFieldSelectOption[] = [
    new ThyFormFieldSelectOption('@period-none', null),
    new ThyFormFieldSelectOption('@global-hour', 3),
    new ThyFormFieldSelectOption('@global-day', 4),
    new ThyFormFieldSelectOption('@global-week', 5),
    new ThyFormFieldSelectOption('@global-month', 6),
    new ThyFormFieldSelectOption('@global-year', 7),
  ];

  public periods: ThyPeriodState[];

  public dataSource: MatTableDataSource<any>;
  public columns = ['name'];

  public naturesFormControl = new FormControl();
  public natures: ThyNatureModel[];
  public filteredNatures: Observable<ThyNatureModel[]>;

  public selection: ThyBaseViewModel;
  public selectionType: ThyObjectType;
  public selectionConvertionFunction: ThyConversionFunctionsStr = ThyConversionFunctionsStr.None;
  public selectionPeriod = null;
  public isPerArea: boolean;
  public reference: string;
  public response: ThySourceResponse;

  public height = 0;
  public bodyHeight = 0;
  public checked = false;
  private _service: ThyBaseTree2Service<ThyBaseDto, ThyBaseModel<ThyBaseDto>>;
  private _attempt = 0;

  public get referenceStr(): string { return this.reference ? `${this.translateService.instant('@global-reference')} : ${this.reference}` : null; }

  constructor(
    dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { types: ThyObjectType[] },
    private naturesService: ThyNatures2Service,
    private periodService: ThyPeriodService,
    private trendsService: ThyTrends2Service,
    private pointsService: ThyPoints2Service,
    private metersService: ThyMeters2Service,
    private locationsService: ThyLocations2Service,
    private groupsService: ThyGroups2Service) {
      super(dialogRef);
      this.initialize();
  }

  ngAfterContentInit() {
    this.resize();
  }

  public initialize() {
    if (this.data && this.data.types) {
      this.periods = this.periodService.periods;
      this.types.forEach(selection => {
        const founded = this.data.types.find(wt => wt === selection.Value);
        if (founded === null || founded === undefined) {
          selection.Visible = false;
        }
      });
    }
    const type = this.types.find(s => s.Visible);
    this.selectionType = type ? type.Value : this.types[0].Value;
    this.natures = this.naturesService.models;
    this.onLoadDataType();
  }

  public validate() {
    if (this.selection) { this.selection.selected = false; }
    this.dialogRef.close(this.response);
  }

  public close() {
    this.dialogRef.close();
  }

  public applyFilter(filterValue: string) {
    this._attempt++;
    const cpt = this._attempt;
    this.timeout(cpt, filterValue);
  }

  private timeout(c, filterValue) {
    setTimeout(() => {
      if (c === this._attempt) {
        if (this.dataSource) {
          this.dataSource.filter = filterValue.trim().toLowerCase();
        }
      }
    }, 100);
  }

  public levelArray(size) {
    const items = [];
    for (let i = 1; i <= size; i++) { items.push(i); }
    return items;
  }

  public onSelection(event: any, element: ThyBaseViewModel) {
    if (event && event.path && event.path[0] && (event.path[0].innerText === 'expand_more' || event.path[0].innerText === 'chevron_right' || event.path[0].innerText === 'more_vert')) {
      return;
    } else {
      this._select(element);
      this.onUpdateReference();
    }
  }

  private _select(element: ThyBaseViewModel) {
    if (element) {
      if (this.selection) {
        this.selection.selected = false;
      }
      element.selected = true;
      this.selection = element;
    }
  }

  public onLoadDataType() {
    if (isNullOrUndefined(this.selectionType)) {
      this.selectionType = this.types[0].Value;
    }
    switch (this.selectionType) {
      case ThyObjectType.Point:
        this._service = this.pointsService;
        this.dataSource = new MatTableDataSource(this._service.models.map(e => new ThyPointViewModel(<ThyPointModel>e)));
        this.checked = false;
      break;
      case ThyObjectType.Trend:
        this._service = this.trendsService;
        this.dataSource = new MatTableDataSource(this._service.models.map(e => new ThyTrendViewModel(<ThyTrendModel>e)));
        this.checked = false;
      break;
      case ThyObjectType.Meter:
        this._service = this.metersService;
        this.dataSource = new MatTableDataSource(this._service.models.map(e => new ThyMeterViewModel(<ThyMeterModel>e)));
        this.checked = true;
      break;
      case ThyObjectType.Location:
        this._service = this.locationsService;
        this.dataSource = new MatTableDataSource(this._service.models.map(e => new ThyLocationViewModel(<ThyLocationModel>e)));
        this.checked = true;
      break;
      case ThyObjectType.Group:
        this._service = this.groupsService;
        this.dataSource = new MatTableDataSource(this._service.models.map(e => new ThyGroupViewModel(<ThyGroupModel>e)));
        this.checked = true;
      break;
    }
    this.dataSource.filterPredicate = (data, filterValue) => this._service.filter(data, filterValue);
    if (this.dataSource && this.dataSource.data && this.dataSource.data.length > 0) {
      this._select(this.dataSource.data[0]);
      this.onUpdateReference();
    }
    setTimeout(() => this.resize(), 1);
  }

  public onUpdateReference() {
    const id = this.selection ? this.selection.Id : 0;
    const natureId = typeof(this.naturesFormControl.value) === 'string' || !this.naturesFormControl.value ? undefined : !this.naturesFormControl.value.Id ? undefined : this.naturesFormControl.value.Id;
    const options: BuildReferenceOptions = { id: id, natureId: natureId, convertion: this.selectionConvertionFunction, perArea: this.isPerArea, period: this.selectionPeriod };
    this.reference = this._service.buildReference(options);
    const model = this._service.getById(id);
    this.response = new ThySourceResponse({ id: id, type: this.selectionType, natureId: natureId, reference: this.reference, model: model });
  }

  public onExpand(event: any, element: ThyBaseTreeViewModel) {
    if (element) {
      element.expanded = !element.expanded;
    }
  }

  public onCollapseAll() {
    if (this.dataSource && this.dataSource.data) {
      let allIsCollapsed = true;
      this.dataSource.data.forEach(d => {
        if (d.level === 1 && d.expanded === true) {
          allIsCollapsed = false;
          return;
        }
      });
      allIsCollapsed ? this.dataSource.data.map(d => d.expanded = true) : this.dataSource.data.map(d => d.expanded = false);
    }
  }

  protected resize() {
    if (this.content) {
      this.height = this.content.nativeElement.offsetHeight;
      if (this.header) {
        this.bodyHeight = this.height - this.header.nativeElement.offsetHeight;
      }
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize();
  }

}
