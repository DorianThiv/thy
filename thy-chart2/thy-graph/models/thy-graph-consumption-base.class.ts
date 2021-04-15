import { Directive, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ThyNatureModel } from "../../../../../thy-public/thy-natures/models/thy-nature-model.class";
import { ThyConsumptionGridModel, ThyConsumptionGridModel2, ThyConsumptionGridTotalModel2 } from "./thy-consumption-grid-view.class";
import { ThyObjectType } from "../../../../thy-services/thy-objects/thy-types.class";
import { ThyPeriodUnit } from "../../../thy-period/models/thy-period-unit.enum";
import { ThyPeriodModel } from "../../../thy-period/models/thy-period-model.class";
import { ThyTranslateService } from "../../../thy-translate";
import { ThyPeriodService } from "../../../thy-period/thy-period.service";
import { MatSelectChange } from "@angular/material/select";
import { ThyGraphComponent } from "../thy-graph.component";
import { CdkTable } from "@angular/cdk/table";
import { ThyConsumptionDisplayType } from "../../../thy-entity-list/models/thy-entity-list-criteria-dto.class";
import { ThyFormFieldSelectOption } from "../../../thy-form-field/thy-form-field-select/thy-form-field-select-option.class";
import { ThyReportSource } from "../../../../../thy-public/thy-reports/models/thy-report-source.class";
import { ThyReportsViewDialogComponent } from "../../../../../thy-public/thy-reports/thy-reports-view-dialog/thy-reports-view-dialog.component";
import { ThyChartDataType } from "../../models/thy-chart-type.enum.class";
import { ThyChartSerie } from "../../models/thy-chart-item.class";
import { ThyUddType } from "../../../../../thy-public/thy-udds/models/thy-udd-type.enum";
import { ThyDialogsService } from "../../../thy-dialogs/thy-dialogs.service";
import { ThyGraphConsumptionService } from "../thy-graph-consumption.service";
import { Value } from "../../../../thy-models/thy-value.class";

@Directive()
export abstract class ThyGraphConsumptionBase<T extends { Id: number, Name: string, EntityType: ThyObjectType }> {

    @ViewChild('chart') chart: ThyGraphComponent;
    @ViewChild('table') table: CdkTable<any>;

    @Input() isFullscreen = false;

    @Output() fullscreen = new EventEmitter();
    @Output() close = new EventEmitter();

    /**
     * Chart
     */
    public data: any;
    public entity: T;
    public nature: ThyNatureModel;

    /**
     * Grid
     */
    public dataSource: MatTableDataSource<ThyConsumptionGridModel2>;
    public periodColumns = ['name'];
    public dates = [];

    /**
     * Controls
     */

    public periodUnits = ThyPeriodUnit;
    public currentDate: Date;
    public period: ThyPeriodModel;
    public unit: number;


    // Display
    public displayTypeOptions: ThyFormFieldSelectOption[] = [
        new ThyFormFieldSelectOption('@global-finalEnergy', ThyConsumptionDisplayType.FinalEnergy),
        new ThyFormFieldSelectOption('@global-primaryEnergy', ThyConsumptionDisplayType.PrimaryEnergy),
        new ThyFormFieldSelectOption('CO2', ThyConsumptionDisplayType.CO2),
        new ThyFormFieldSelectOption('@global-cost', ThyConsumptionDisplayType.Cost),
    ];
    
    public displayType = ThyConsumptionDisplayType.FinalEnergy;
    public tariff = false;
    public cumul = false;
    public normalized = false;
    public power = false;
    public byDegreeDays = false;
    public perAreaUnit = false;
    public showPreviousYear = false;
    
    public isModified = false;
    public isTable = false;
    public isTotalMode = false;
    public loading = false;

    protected _lastPeriod: ThyPeriodModel;

    public get title(): string {
        return `${this.entity ? this.entity.Name : ''}${this.nature ? ` (${this.nature.Name}${this.nature.Unit ? ` - ${this.nature.Unit}` : ''})` : ''}`;
    }

    constructor(
        protected consumptionsService: ThyGraphConsumptionService,
        protected translateService: ThyTranslateService,
        protected periodService: ThyPeriodService,
        protected dialogsService: ThyDialogsService) {
            this.currentDate = this.periodService.today;
            this.unit = this.periodService.getPeriodStateByUnit(ThyPeriodUnit.Week).unit;
            this.period = this.periodService.getPeriodByUnit(this.currentDate, ThyPeriodUnit.Week);
    }

    public async initialize(entity: any, nature: ThyNatureModel) {
        if (entity) {
            this.entity = entity;
            this.nature = nature;
            await this.refresh();
        }
    }

    public async refresh() {
        this.period.StartDate = new Date(this.period.StartDate);
        this.period.EndDate = new Date(this.period.EndDate);
        this.load();
    }

    public abstract load(): void;

    protected buildTable(consumptions: ThyChartSerie[], degrees?: ThyChartSerie[]) {
        // Build table
        const currentConsumption = consumptions.filter(c => !c.Offset);
        const offsetConsumption = consumptions.filter(c => c.Offset);
        let vmCurrentConsumption: ThyConsumptionGridModel2[] = [];
        let vmOffsetConsumptions: ThyConsumptionGridModel2[] = [];
        vmCurrentConsumption = currentConsumption.map(c => new ThyConsumptionGridModel2(c.Name, c.Unit, c.Color, c.RawValues ? c.RawValues.map(v => new Value(v.d, v.v)) : [], null));
        if (vmCurrentConsumption && vmCurrentConsumption.length > 0) {
          if (vmCurrentConsumption[0] && vmCurrentConsumption[0].Values) {
            this.periodColumns = [].concat(['name'], vmCurrentConsumption[0].Values.map(v => v.dateTime.toJSON()), ['total']);
            if (vmCurrentConsumption.length > 1) {
              vmCurrentConsumption.push(new ThyConsumptionGridTotalModel2(vmCurrentConsumption, vmCurrentConsumption[0].Values.map(v => v.dateTime.toJSON())));
            }
          }
          // If there are consumption of last year
          if (offsetConsumption && offsetConsumption.length > 0) {
            vmOffsetConsumptions = offsetConsumption.map(c => new ThyConsumptionGridModel2(c.Name, c.Unit, c.Color, c.RawValues ? c.RawValues.map(v => {
              const value = new Value(v.d, v.v);
              this.periodService.shiftDate(value.dateTime, c.Offset, c.OffsetUnit);
              return value;
            }) : [], null))
            if (vmOffsetConsumptions.length > 1) {
              vmOffsetConsumptions.push(new ThyConsumptionGridTotalModel2(vmOffsetConsumptions, vmOffsetConsumptions[0].Values.map(v => v.dateTime.toJSON())));
            }
          }
          const dataSource = [].concat(
            vmCurrentConsumption,
            vmOffsetConsumptions,
            degrees ? degrees.map(d => new ThyConsumptionGridModel2(d.Name, d.Unit, d.Color, d.RawValues ? d.RawValues.map(v => new Value(v.d, v.v)) : [], null)) : []
          );
          this.dataSource = new MatTableDataSource(dataSource);
        }
    }

    /**
     * @param {string} date formated json date.
     */
    public getFormatedDate(date: string) {
        if (date) {
            const fdate = new Date(date); 
            switch (this.period.Duration.Unit) {
                case ThyPeriodUnit.Day:
                    const hours = fdate.getHours();
                    if (hours < 10) {
                        return '0' + hours + ':00';
                    } else {
                        return hours + ':00';
                    }
                case ThyPeriodUnit.Week:
                    return this.translateService.formatDate(fdate, true);
                case ThyPeriodUnit.Month:
                    return fdate.getDate();
                case ThyPeriodUnit.Year:
                    return this.translateService.formatDate(fdate, true);
                case ThyPeriodUnit.Decennary:
                    return fdate.getFullYear();
            }
        }
    }

    protected selectPowerPeriod() {
        if (!this._lastPeriod) {
            this._lastPeriod = this.period.clone();
        }
        this._lastPeriod.StartDate = new Date(this.period.StartDate);
        this._lastPeriod.EndDate = new Date(this.period.EndDate);
        switch (this.period.Duration.Unit) {
            case ThyPeriodUnit.Day:
                this.period.SampleDuration.Value = 5;
                this.period.SampleDuration.Unit = ThyPeriodUnit.Minute;
                break;
            case ThyPeriodUnit.Week:
                this.period.SampleDuration.Value = 1;
                this.period.SampleDuration.Unit = ThyPeriodUnit.Hour;
                break;
            case ThyPeriodUnit.Month:
                this.period.SampleDuration.Value = 1;
                this.period.SampleDuration.Unit = ThyPeriodUnit.Hour;
                break;
            case ThyPeriodUnit.Year:
                this.period.SampleDuration.Value = 1;
                this.period.SampleDuration.Unit = ThyPeriodUnit.Day;
                break;
            case ThyPeriodUnit.Decennary:
                this.period.SampleDuration.Value = 1;
                this.period.SampleDuration.Unit = ThyPeriodUnit.Month;
                break;
        }
    }

    public onRefresh() {
        if (this.loading) { return; }
        this.refresh();
    }

    public onRight() {
        if (this.loading) { return; }
        const shift = this.unit === ThyPeriodUnit.None ? this.periodService.getDaysBetweenTwoDates(this.period.StartDate, this.period.EndDate) : 1;
        const unit = shift !== 1 ? ThyPeriodUnit.Day : this.unit;
        this.periodService.shiftPeriod(this.period, shift, unit);
        this.refresh();
    }

    public onLeft() {
        if (this.loading) { return; }
        const shift = this.unit === ThyPeriodUnit.None ? this.periodService.getDaysBetweenTwoDates(this.period.StartDate, this.period.EndDate) : 1;
        const unit = shift !== 1 ? ThyPeriodUnit.Day : this.unit;
        this.periodService.shiftPeriod(this.period, shift, unit, true);
        this.refresh();
    }

    public onSelectedPeriodChart(event: any) {
        if (this.loading || this.unit === ThyPeriodUnit.Day) { return; }
        const date = event.point ? new Date(event.point.x) : null;
        if (date) {
            if (this.unit === ThyPeriodUnit.None) {
                this.unit = this.period.Duration.Unit;
            }
            this.unit -=  this.unit === ThyPeriodUnit.Month ? 2 : 1;
            this.period = this.periodService.getPeriodByUnit(date, this.unit);
            this.refresh();
        }
    }

    public onSelectedPeriodUnit(event: MatSelectChange) {
        if (this.loading) { return; }
        if (event.value !== ThyPeriodUnit.None) {
            this.unit = event.value;
            this.period = this.periodService.getPeriodByUnit(this.periodService.today, this.unit);
            this.refresh();
        }
    }

    public onChangeView(event: string) {
        this.isTable = event === 'table';
        this.refresh();
    }

    public onChangeDate(dateType: string, event: any) {
        switch (dateType) {
        case 'start':
            this.period.StartDate = event.value;
            if (this.unit) {
            const period = this.periodService.getPeriodByUnit(this.period.StartDate, this.unit);
            this.period.StartDate = period.StartDate;
            this.period.EndDate = period.EndDate;
            }
            break;
        case 'end':
            this.unit = ThyPeriodUnit.None;
            this.period.EndDate = event.value;
            break;
        }
        this.isModified = true;
    }

    public onStartDateChange(date: Date) {
        this.period.StartDate = date;
        if (this.unit) {
            const period = this.periodService.getPeriodByUnit(this.period.StartDate, this.unit);
            this.period.StartDate = period.StartDate;
            this.period.EndDate = period.EndDate;
        }
        this.isModified = true;
    }

    public onEndDateChange(date: Date) {
        this.unit = ThyPeriodUnit.None;
        this.period.EndDate = date;
        this.isModified = true;
    }

    public onLoading(load: boolean) {
        this.loading = load;
    }

    public onPrint() {
        if (this.entity) {
          const parameters = {
            MeterId: this.entity.EntityType === ThyObjectType.Meter ? this.entity.Id : null,
            LocationId: this.entity.EntityType === ThyObjectType.Location ? this.entity.Id : null,
            GroupId: this.entity.EntityType === ThyObjectType.Group ? this.entity.Id : null,
            ServiceId: this.nature ? this.nature.Id : -1,
            StartDate: this.period.StartDate.toJSON(),
            EndDate: this.period.EndDate.toJSON(),
            SamplePeriodType: this.period.SampleDuration.Unit,
            SamplePeriodDuration: this.period.SampleDuration.Value,
            ShowTariff: this.tariff ? 1 : 0,
            Cumul: this.cumul ? 1 : 0,
            ByDegreeDays: this.byDegreeDays ? 1 : 0,
            PerAreaUnit: this.perAreaUnit ? 1 : 0,
            ShowPreviousYear: this.showPreviousYear ? 1 : 0,
            DisplayType: this.displayType,
            VisibleTrends: this.chart ? this.chart.legendItems.filter(i => i.visible && i.userOptions.model.DataType === ThyChartDataType.Trend).map(i => (i.userOptions.model as ThyChartSerie).Id).join(';') : 0,
            VisibleNatures: this.chart ? this.chart.legendItems.filter(i => i.visible && i.userOptions.model.DataType === ThyChartDataType.Consumption).map(i => (i.userOptions.model as ThyChartSerie).Id).join(';') : 0,
            ShowHDD: this.chart ? this.chart.legendItems.find(i => i.visible && i.userOptions.model.DataType === ThyChartDataType.DegreeDays && i.userOptions.model.Id === ThyUddType.Heating) ? 1 : 0 : 1,
            ShowCDD: this.chart ? this.chart.legendItems.find(i => i.visible && i.userOptions.model.DataType === ThyChartDataType.DegreeDays && i.userOptions.model.Id === ThyUddType.Cooling) ? 1 : 0 : 1
          };
          const reportSource = new ThyReportSource('MeterReport2', parameters);
          this.dialogsService.resolve(ThyReportsViewDialogComponent, { height: '90%', width: '90%', data: { source: reportSource } });
        }
    }

}
