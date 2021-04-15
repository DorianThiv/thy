import { Component, Inject } from '@angular/core';
import { ThyDialogBase } from '../thy-dialogs/models/thy-dialog-base.class';
import { ThyPeriodModel } from './models/thy-period-model.class';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThyTranslateService } from '../thy-translate';
import { ThyPeriodService } from './thy-period.service';
import { ThyPeriodUnit } from './models/thy-period-unit.enum';
import { ThyFormFieldSelectOption } from '../thy-form-field/thy-form-field-select/thy-form-field-select-option.class';

export interface IThyPeriodDialogOptions {
  showDefault?: boolean;
  showHours?: boolean;
  showSample?: boolean;
}

@Component({
  selector: 'thy-period',
  templateUrl: './thy-period.component.html',
  styleUrls: ['./thy-period.component.scss']
})
export class ThyPeriodComponent extends ThyDialogBase {

  public period: ThyPeriodModel;

  public startOptions = [
    new ThyFormFieldSelectOption('@global-currentHour', ThyPeriodUnit.Hour),
    new ThyFormFieldSelectOption('@global-currentDay', ThyPeriodUnit.Day),
    new ThyFormFieldSelectOption('@global-currentWeek', ThyPeriodUnit.Week),
    new ThyFormFieldSelectOption('@global-currentMonth', ThyPeriodUnit.Month),
    new ThyFormFieldSelectOption('@global-currentYear', ThyPeriodUnit.Year),
  ];

  public offsetOptions = [
    new ThyFormFieldSelectOption('@offset-none', ThyPeriodUnit.None),
    new ThyFormFieldSelectOption('@global-hours', ThyPeriodUnit.Hour),
    new ThyFormFieldSelectOption('@global-days', ThyPeriodUnit.Day),
    new ThyFormFieldSelectOption('@global-weeks', ThyPeriodUnit.Week),
    new ThyFormFieldSelectOption('@global-months', ThyPeriodUnit.Month),
    new ThyFormFieldSelectOption('@global-years', ThyPeriodUnit.Year),
  ];

  public durationOptions = [
    new ThyFormFieldSelectOption('@global-none', ThyPeriodUnit.None),
    new ThyFormFieldSelectOption('@global-hours', ThyPeriodUnit.Hour),
    new ThyFormFieldSelectOption('@global-days', ThyPeriodUnit.Day),
    new ThyFormFieldSelectOption('@global-weeks', ThyPeriodUnit.Week),
    new ThyFormFieldSelectOption('@global-months', ThyPeriodUnit.Month),
    new ThyFormFieldSelectOption('@global-years', ThyPeriodUnit.Year),
  ];

  public sampleOptions = [
    new ThyFormFieldSelectOption('@sampling-none', ThyPeriodUnit.None),
    new ThyFormFieldSelectOption('@global-hours', ThyPeriodUnit.Hour),
    new ThyFormFieldSelectOption('@global-days', ThyPeriodUnit.Day),
    new ThyFormFieldSelectOption('@global-weeks', ThyPeriodUnit.Week),
    new ThyFormFieldSelectOption('@global-months', ThyPeriodUnit.Month),
    new ThyFormFieldSelectOption('@global-years', ThyPeriodUnit.Year),
  ];

  constructor(
    dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { period: ThyPeriodModel, compactPeriod: string, options: IThyPeriodDialogOptions },
    private translateService: ThyTranslateService,
    private periodsService: ThyPeriodService) {
      super(dialogRef, data);
      this.initialize();
  }

  public initialize() {
    this.period = this.data && this.data.period ? this.data.period : this.periodsService.defaultPeriod;
    if (this.data) {
      if (this.data.period) {
        this.period = this.data.period;
      } else if (this.data.compactPeriod) {
        this.period = this.periodsService.decodeCompactStringToPeriod(this.data.compactPeriod);
      } else {
        this.period = this.periodsService.defaultPeriod;
      }
    }
    this.period = this.periodsService.buildPeriodStartEndFromDurationAndOffset(this.period);
    this.period.StartDateStr = this.translateService.convertDateToString(this.period.StartDate, ThyPeriodUnit.Day);
    this.period.EndDateStr = this.translateService.convertDateToString(this.period.EndDate, ThyPeriodUnit.Day);
  }

  public update() {
    this.period = this.periodsService.buildPeriodStartEndFromDurationAndOffset(this.period);
    this.period.StartDateStr = this.translateService.convertDateToString(this.period.StartDate, ThyPeriodUnit.Day);
    this.period.EndDateStr = this.translateService.convertDateToString(this.period.EndDate, ThyPeriodUnit.Day);
  }

  public async validate() {
    this.period.Compact = this.periodsService.encodeToCompactString(this.period);
    this.dialogRef.close(this.period);
  }
}
