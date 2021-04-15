import { ChangeDetectorRef, Directive, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ThyFormatService } from "../../thy-format/thy-format.service";
import { ThyTranslateService } from "../../thy-translate";
import { ThyFormFieldSelectOption } from "../../thy-form-field/thy-form-field-select/thy-form-field-select-option.class";
import { ThyPeriodService } from "../../thy-period/thy-period.service";
import { ThyPeriodModel } from "../../thy-period/models/thy-period-model.class";
import { ThyPeriodUnit } from "../../thy-period/models/thy-period-unit.enum";
import { ThyHeatmapComponent, ThyHeatmapPeriod } from "../thy-heatmap/thy-heatmap.component";
import { ThyHeatmapService } from "../thy-heatmap/thy-heatmap.service";
import { ThyHeatmapOptions } from "./thy-heatmap-options.class";
import { isNullOrUndefined } from "../../thy-utils-functions/thy-utils-functions.service";

@Directive()
export class ThyHeatmapEntityBase<T extends { Id: number, Name: string, EntityType: any }> {

    // @ViewChild('heatmap') heatmap: ThyHeatmapComponent;

    // @Input() isFullscreen = false;
  
    // @Output() fullscreen = new EventEmitter();
    // @Output() close = new EventEmitter();
  
    // private _entity: T;
    // private _nature: any;
    
    // private _hours: number[] = [];
    // private _dates: number[] = [];
  
    // public min = 0;
    // public max: number;
    // public period: ThyPeriodModel;

    // public options = new ThyHeatmapOptions();
  
    // public duration = ThyHeatmapPeriod.PerDay;
    // public durationOptions = [
    //   new ThyFormFieldSelectOption('@global-per-month', ThyHeatmapPeriod.PerMonth),
    //   new ThyFormFieldSelectOption('@global-per-day', ThyHeatmapPeriod.PerDay),
    // ]
  
    // public loading = false;
  
    // public get title(): string {
    //   return `${this._entity ? this._entity.Name : ''}${this._nature ? ` (${this._nature.Name})` : ''}`;
    // }
  
    // public get unit(): string { return this._nature ? this._nature.Unit: null;  }
  
    // constructor(private service: ThyHeatmapService, private periodService: ThyPeriodService, private translateService: ThyTranslateService, private formatService: ThyFormatService, private cdr: ChangeDetectorRef) {
    //   this.period = this.periodService.getPeriodByUnit(this.periodService.today, ThyPeriodUnit.Month);
    //   for (let i = 0; i < 24; i++) { this._hours.push(i); }
    //   for (let i = 0; i < 35; i++) { this._dates.push(i); }
    //   this.loadOptions();
    // }

    // private async loadOptions() {
    //   const options = await this.service.getOptions();
    //   if (options) {
    //     this.options = options;
    //   }
    // }
  
    // public initialize(entity: any, nature: any) {
    //     if (entity) {
    //         this._entity = entity;
    //         this._nature = nature;
    //         this.load();
    //     }
    // }
  
    // public async load() {
    //   this.period.StartDate = new Date(this.period.StartDate);
    //   this.period.EndDate = new Date(this.period.EndDate);
    //   if (this.duration === ThyHeatmapPeriod.PerDay) {
    //     this.max = this._hours.length - 1;
    //     this.period.Duration.Unit = ThyPeriodUnit.Day;
    //     this.period.SampleDuration.Unit = ThyPeriodUnit.Hour;
    //   } else if (this.duration === ThyHeatmapPeriod.PerMonth) {
    //     this.max = this._dates.length - 1;
    //     this.period.Duration.Unit = ThyPeriodUnit.Month;
    //     this.period.SampleDuration.Unit = ThyPeriodUnit.Day;
    //   }
    //   const consumptions = await this.service.getEntityConsumptions(this._entity.Id, this._entity.EntityType, this.period, this._nature ? this._nature.Id : null);
    //   if (consumptions && consumptions.Data && consumptions.Data[0] && consumptions.Data[0].Data) {
    //     const data: number[][] = [];
    //     const dates: Date[] = [];
    //     let offset = 0;
    //     for (const value of consumptions.Data[0].Data) {
    //       const date = new Date(parseInt(value.d.substr(6), 10));
    //       // Group dates
    //       const findDate = dates.find(d => {
    //         if (this.duration === ThyHeatmapPeriod.PerDay) {
    //           return date.getDate() === d.getDate() ? date : null;
    //         } else if (this.duration === ThyHeatmapPeriod.PerMonth) {
    //           return date.getMonth() === d.getMonth() ? date : null;
    //         }
    //       });
    //       if (!findDate) {
    //         offset = 0;
    //         dates.push(date);
    //         if (this.duration === ThyHeatmapPeriod.PerMonth) {
    //           const dayOffset = date.getDay() - 1 < 0 ? date.getDay() + 6 : date.getDay() - 1;
    //           for (let i = 0; i < dayOffset; i++) {
    //             offset = i;
    //             data.push([this._dates.find(d => d === i), dates.length - 1, null]);
    //           }
    //         }
    //       }
    //       // Build values structure
    //       const x = this.duration === ThyHeatmapPeriod.PerDay ? this._hours.find(d => d === date.getHours()) : this._dates.find(d => d === date.getDate() + offset - 1);
    //       const y = dates.length -1;
    //       const v = !isNullOrUndefined(value.v) ? value.v : null;
    //       data.push([x, y, v]);
    //     }
    //     this.heatmap.data = data;
    //     const xList = this.duration === ThyHeatmapPeriod.PerDay ? this._hours : this._dates;
    //     this.heatmap.xCategories = xList.map(m => this.formatXCategories(m));
    //     this.heatmap.yCategories = dates.map(m => this.formatYCategories(m));
    //     this.heatmap.unit = this.unit;
    //     this.heatmap.min = this.options.min
    //     this.heatmap.max = this.options.max
    //     this.heatmap.colorMin = this.options.colorMin
    //     this.heatmap.colorMax = this.options.colorMax
    //     this.heatmap.axisMin = this.min;
    //     this.heatmap.axisMax = this.max;
    //     this.heatmap.initialize();
    //     this.cdr.detectChanges();
    //   } else {
    //     this.clear();
    //   }
    // }
  
    // private formatXCategories(num: number) {
    //   if (this.duration === ThyHeatmapPeriod.PerDay) {
    //     return num < 10 ? `0${num}:00` : `${num}:00`;
    //   } else if (this.duration === ThyHeatmapPeriod.PerMonth) {
    //     return this.translateService.resolveDayOfWeek(num);
    //   }
    // }
  
    // private formatYCategories(date: Date) {
    //   return this.formatService.formatDate(date, this.duration === ThyHeatmapPeriod.PerDay ? ThyPeriodUnit.Day : ThyPeriodUnit.Month);
    // }
  
    // public resize() {
    //   this.heatmap.resize();
    //   this.cdr.detectChanges();
    // }

    // public clear() {
    //     this.heatmap.data = [];
    //     this.heatmap.initialize();
    //     this.cdr.detectChanges();
    // }
  
    // public onChangePeriod() {
    //   if (this.duration === ThyHeatmapPeriod.PerMonth) {
    //     this.period = this.periodService.getPeriodByUnit(this.period.StartDate, ThyPeriodUnit.Year);
    //   } else if (this.duration === ThyHeatmapPeriod.PerDay) {
    //     this.period = this.periodService.getPeriodByUnit(this.period.StartDate, ThyPeriodUnit.Month);
    //   }
    //   this.load();
    // }
  
    // public onLeft() {
    //   if (this.duration === ThyHeatmapPeriod.PerMonth) {
    //     this.periodService.shiftByYears(this.period, 1, true);
    //   } else if (this.duration === ThyHeatmapPeriod.PerDay) {
    //     this.periodService.shiftByMonths(this.period, 1, true);
    //   }
    //   this.load();
    // }
  
    // public onRight() {
    //   if (this.duration === ThyHeatmapPeriod.PerMonth) {
    //     this.periodService.shiftByYears(this.period, 1);
    //   } else if (this.duration === ThyHeatmapPeriod.PerDay) {
    //     this.periodService.shiftByMonths(this.period, 1);
    //   }
    //   this.load();
    // }
  
    // public onStartDateChange(date: Date) {
    //   this.period.StartDate = date;
    //   if (this.duration === ThyHeatmapPeriod.PerMonth) {
    //     this.period = this.periodService.getPeriodByUnit(this.period.StartDate, ThyPeriodUnit.Year);
    //   } else if (this.duration === ThyHeatmapPeriod.PerDay) {
    //     this.period = this.periodService.getPeriodByUnit(this.period.StartDate, ThyPeriodUnit.Month);
    //   }
    //   this.load();
    // }
  
    // public onEndDateChange(date: Date) {
    //   this.period.EndDate = date;
    //   this.load();
    // }
  
    // public onPrint() {
  
    // }

    // public onOptionsChange() {
    //   this.service.setOptions(this.options);
    //   this.load();
    // }

}