import { Injectable } from '@angular/core';
import { ThyTranslateService } from '../thy-translate';
import { ThyPeriodModel, ThyPeriodDuration } from './models/thy-period-model.class';
import { ThyPeriodUnit, ThyPeriodUnitStr, ThyPeriodUnitChar, ThyPeriodCurrentStr } from './models/thy-period-unit.enum';

export interface ThyDateOptions {
  seconds?: number;
  minutes?: number;
  hours?: number;
  date?: number;
  month?: number;
  year?: number;
}

export interface ThyPeriodState {
  name: string;
  unit: ThyPeriodUnit;
}

@Injectable({
  providedIn: 'root'
})
export class ThyPeriodService {

  public get today(): Date { return new Date(Date.now()); }

  public get min(): Date { return new Date(-62135596800000); }

  public get periods(): ThyPeriodState[] {
    return [{
      name: '@global-decennary',
      unit: ThyPeriodUnit.Decennary
    }, {
      name: '@global-year',
      unit: ThyPeriodUnit.Year
    }, {
      name: '@global-month',
      unit: ThyPeriodUnit.Month
    }, {
      name: '@global-week',
      unit: ThyPeriodUnit.Week
    }, {
      name: '@global-day',
      unit: ThyPeriodUnit.Day
    }];
  }

  public get voidPeriod(): ThyPeriodModel {
    const start = ThyPeriodUnit.None;
    const offset = new ThyPeriodDuration(ThyPeriodUnit.None, 0);
    const duration = new ThyPeriodDuration(ThyPeriodUnit.None, 0);
    const startDate = this.today;
    const endDate = this.today;
    return new ThyPeriodModel(startDate, endDate, duration, undefined, offset, start);
  }

  public get defaultPeriod(): ThyPeriodModel {
      const start = ThyPeriodUnit.Day;
      const offset = new ThyPeriodDuration(ThyPeriodUnit.Day, -6);
      const duration = new ThyPeriodDuration(ThyPeriodUnit.Day, 7);
      const period = new ThyPeriodModel(undefined, undefined, duration, undefined, offset, start);
      return this.buildPeriodStartEndFromDurationAndOffset(period);
  }

  /**
   * Default compact period : `D7D-6D`
   */
  public get defaultCompactPeriod(): string { return 'D7D-6D'; }

  constructor(private translateService: ThyTranslateService) { }

  public formatDatesToDuration(date1: Date, date2: Date) {
    let delta = Math.abs(date1.getTime() - date2.getTime()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= days * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const secondes = Math.floor(delta) % 60;
    return this.translateService.formatDurationConditional(days, hours, minutes, secondes);
  }

  /**
   * @param delat In seconds.
   */
  public formatSecondsToDuration(delta: number) {
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= days * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = Math.floor(delta) % 60;
    return this.translateService.formatDurationConditional(days, hours, minutes, seconds);
  }

  /**
   * Resolve text period unit to number period unit.
   */
  public resolveStringToUnit(unitStr: ThyPeriodUnitStr | string): ThyPeriodUnit {
    switch (unitStr) {
      case ThyPeriodUnitStr.Hour:
        return ThyPeriodUnit.Hour;
      case ThyPeriodUnitStr.Day:
        return ThyPeriodUnit.Day;
      case ThyPeriodUnitStr.Week:
        return ThyPeriodUnit.Week;
      case ThyPeriodUnitStr.Month:
        return ThyPeriodUnit.Month;
      case ThyPeriodUnitStr.Year:
        return ThyPeriodUnit.Year;
      default:
        return ThyPeriodUnit.None;
    }
  }

  /**
   * Resolve text period unit to number period unit.
   */
  public resolveCharToUnit(unitChar: ThyPeriodUnitChar | string): ThyPeriodUnit {
    switch (unitChar) {
      case ThyPeriodUnitChar.Hour:
        return ThyPeriodUnit.Hour;
      case ThyPeriodUnitChar.Day:
        return ThyPeriodUnit.Day;
      case ThyPeriodUnitChar.Week:
        return ThyPeriodUnit.Week;
      case ThyPeriodUnitChar.Month:
        return ThyPeriodUnit.Month;
      case ThyPeriodUnitChar.Year:
        return ThyPeriodUnit.Year;
      default:
        return ThyPeriodUnit.None;
    }
  }

  /**
   * Resolve text period unit to number period unit.
   */
  public resolveUnitToChar(unit: ThyPeriodUnit | number): ThyPeriodUnitChar {
    switch (unit) {
      case ThyPeriodUnit.Hour:
        return ThyPeriodUnitChar.Hour;
      case ThyPeriodUnit.Day:
        return ThyPeriodUnitChar.Day;
      case ThyPeriodUnit.Week:
        return ThyPeriodUnitChar.Week;
      case ThyPeriodUnit.Month:
        return ThyPeriodUnitChar.Month;
      case ThyPeriodUnit.Year:
        return ThyPeriodUnitChar.Year;
      default:
        return ThyPeriodUnitChar.None;
    }
  }

  /**
   * Resolve number period unit to text period unit.
   */
  public resolveUnitToString(unit: ThyPeriodUnit | number): ThyPeriodUnitStr {
    switch (unit) {
      case ThyPeriodUnit.Hour:
        return ThyPeriodUnitStr.Hour;
      case ThyPeriodUnit.Day:
        return ThyPeriodUnitStr.Day;
      case ThyPeriodUnit.Week:
        return ThyPeriodUnitStr.Week;
      case ThyPeriodUnit.Month:
        return ThyPeriodUnitStr.Month;
      case ThyPeriodUnit.Year:
        return ThyPeriodUnitStr.Year;
      default:
        return ThyPeriodUnitStr.None;
    }
  }

  public resolveCurrentStringToUnit(current: string) {
    switch (current) {
      case ThyPeriodCurrentStr.Hour:
        return ThyPeriodUnit.Hour;
      case ThyPeriodCurrentStr.Day:
        return ThyPeriodUnit.Day;
      case ThyPeriodCurrentStr.Week:
        return ThyPeriodUnit.Week;
      case ThyPeriodCurrentStr.Month:
        return ThyPeriodUnit.Month;
      case ThyPeriodCurrentStr.Year:
        return ThyPeriodUnit.Year;
      default:
        return ThyPeriodUnit.None;
    }
  }

  public getWeekNumber(date: Date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // @ts-ignore
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  public getTranslationByStringUnit(unitStr: ThyPeriodUnitStr) {
    switch (unitStr) {
      case ThyPeriodUnitStr.Hour:
        return '@global-hours';
      case ThyPeriodUnitStr.Day:
        return '@global-days';
      case ThyPeriodUnitStr.Week:
        return '@global-weeks';
      case ThyPeriodUnitStr.Month:
        return '@global-months';
      case ThyPeriodUnitStr.Year:
        return '@global-years';
      default:
        return '@global-default';
    }
  }

  public getTranslationByUnit(unit: ThyPeriodUnit) {
    switch (unit) {
      case ThyPeriodUnit.Hour:
        return '@global-hours';
      case ThyPeriodUnit.Day:
        return '@global-days';
      case ThyPeriodUnit.Week:
        return '@global-weeks';
      case ThyPeriodUnit.Month:
        return '@global-months';
      case ThyPeriodUnit.Year:
        return '@global-years';
      default:
        return '@global-default';
    }
  }

  public getFirstDayOfTheWeek(date: Date): Date {
    date = new Date(date);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  /**
   * Give the start and end date of a current date.
   * Based on period unit (`Day, Week, Month, Year, Decennary`)
   * @param date Date based on.
   * @param unit Period unit to use `ThyPeriodUnit`
   * @param forceToday Force to set end date today (default: `false`)
   */
  public getPeriodByUnit(date: Date, unit: ThyPeriodUnit, forceToday = false): ThyPeriodModel {
    let start;
    let startDate;
    let endDate;
    let offset;
    let duration;
    let sample;
    switch (unit) {
      case ThyPeriodUnit.Hour:
        start = ThyPeriodUnit.Hour,
        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0);
        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1, 0);
        duration = new ThyPeriodDuration(ThyPeriodUnit.Hour, 1);
        sample = new ThyPeriodDuration(ThyPeriodUnit.Minute, 1);
        offset = new ThyPeriodDuration(ThyPeriodUnit.Hour, 0);
        break;
      case ThyPeriodUnit.Day:
        start = ThyPeriodUnit.Day;
        startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0);
        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, -1);
        duration = new ThyPeriodDuration(ThyPeriodUnit.Day, 1);
        sample = new ThyPeriodDuration(ThyPeriodUnit.Hour, 1);
        offset = new ThyPeriodDuration(ThyPeriodUnit.Day, 0);
        break;
      case ThyPeriodUnit.Week:
        start = ThyPeriodUnit.Week;
        const monday = this.getFirstDayOfTheWeek(date);
        startDate = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 0);
        endDate = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 7, 0, 0, -1);
        duration = new ThyPeriodDuration(ThyPeriodUnit.Week, 1);
        sample = new ThyPeriodDuration(ThyPeriodUnit.Day, 1);
        offset = new ThyPeriodDuration(ThyPeriodUnit.Week, 0);
        break;
      case ThyPeriodUnit.Month:
        start = ThyPeriodUnit.Month;
        startDate = new Date(date.getFullYear(), date.getMonth(), 1, 0);
        endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
        duration = new ThyPeriodDuration(ThyPeriodUnit.Month, 1);
        sample = new ThyPeriodDuration(ThyPeriodUnit.Day, 1);
        offset = new ThyPeriodDuration(ThyPeriodUnit.Month, 0);
        break;
      case ThyPeriodUnit.Year:
        start = ThyPeriodUnit.Year;
        startDate = new Date(date.getFullYear(), 0, 1, 0);
        endDate = new Date(date.getFullYear() + 1, 0, 0, 23, 59, 59);
        duration = new ThyPeriodDuration(ThyPeriodUnit.Year, 1);
        sample = new ThyPeriodDuration(ThyPeriodUnit.Month, 1);
        offset = new ThyPeriodDuration(ThyPeriodUnit.Year, 0);
        break;
      case ThyPeriodUnit.Decennary:
        start = ThyPeriodUnit.Decennary;
        startDate = new Date(date.getFullYear() - 10, 0, 1, 0);
        endDate = new Date(date.getFullYear(), 11, 31, 23, 59, 59);
        duration = new ThyPeriodDuration(ThyPeriodUnit.Decennary, 1);
        sample = new ThyPeriodDuration(ThyPeriodUnit.Year, 1);
        offset = new ThyPeriodDuration(ThyPeriodUnit.Decennary, 0);
        break;
    }
    if (forceToday) { endDate = this.today; }
    return new ThyPeriodModel(startDate, endDate, duration, sample, offset, start);
  }

  public getPeriodStateByUnit(unit: ThyPeriodUnit) {
    return this.periods.find(p => p.unit === unit);
  }

  public getPeriodByTrendsGroupDuration(duration: string): ThyPeriodModel {
    if (duration) {
      const splitted = duration.split(':');
      if (splitted) {
          const years = splitted[0] !== undefined && splitted[0] !== null ? Number(splitted[0]) : 0;
          const months = splitted[1] !== undefined && splitted[1] !== null ? Number(splitted[1]) : 0;
          const days = splitted[2] !== undefined && splitted[2] !== null ? Number(splitted[2]) : 0;
          const hours = splitted[3] !== undefined && splitted[3] !== null ? Number(splitted[3]) : 0;
          const minutes = splitted[4] !== undefined && splitted[4] !== null ? Number(splitted[4]) : 0;
          const end = this.today;
          const start = new Date(end.getFullYear() - years, end.getMonth() - months, end.getDate() - days, end.getHours());
          return new ThyPeriodModel(start, end);
      }
    }
  }

  public getPeriodByDashboardPeriod(period: { Duration: number, DurationUnit: number, Offset: number, OffsetUnit: number, Start: number }): ThyPeriodModel {
    if (period) {
      const duration = new ThyPeriodDuration(period.DurationUnit, period.Duration);
      const offset = new ThyPeriodDuration(period.OffsetUnit, period.Offset);
      const start = period.Start;
      return new ThyPeriodModel(undefined, undefined, duration, undefined, offset, start);
    }
  }

  public getPeriodByDashboardPeriodWithStartEnd(period: { Duration: number, DurationUnit: number, Offset: number, OffsetUnit: number, Start: number }): ThyPeriodModel {
    if (period) {
      const duration = new ThyPeriodDuration(period.DurationUnit, period.Duration);
      const offset = new ThyPeriodDuration(period.OffsetUnit, period.Offset);
      const start = period.Start;
      return this.buildPeriodStartEndFromDurationAndOffset(new ThyPeriodModel(undefined, undefined, duration, undefined, offset, start));
    }
  }

  public getPeriodByXmlDashboardPeriod(periodStart: string, periodOffset: number, periodOffsetUnit: string, periodDuration: number, periodUnit: string) {
    const start = this.resolveCurrentStringToUnit(periodStart);
    const offsetUnit = this.resolveStringToUnit(periodOffsetUnit);
    const durationUnit = this.resolveStringToUnit(periodUnit);
    const duration = new ThyPeriodDuration(durationUnit, periodDuration);
    const offset = new ThyPeriodDuration(offsetUnit, periodOffset);
    return new ThyPeriodModel(undefined, undefined, duration, undefined, offset, start);
  }

  public getDaysBetweenTwoDates(date1: Date, date2: Date) {
    let delta = Math.abs(date1.getTime() - date2.getTime()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    return days;
  }

  public getEndDateFromDuration(start: Date, duration: ThyPeriodDuration) {
    let date: Date;
    if (start && duration) {
      switch (duration.Unit) {
        case ThyPeriodUnit.Hour:
          date = new Date(start);
          date.setHours(start.getHours() + duration.Value);
          break;
        case ThyPeriodUnit.Day:
          date = new Date(start);
          date.setDate(start.getDate() + duration.Value);
          break;
        case ThyPeriodUnit.Week:
          date = new Date(start);
          date.setDate(start.getDate() + (7 * duration.Value));
          break;
        case ThyPeriodUnit.Month:
          date = new Date(start);
          date.setMonth(start.getMonth() + duration.Value);
          break;
        case ThyPeriodUnit.Year:
          date = new Date(start);
          date.setFullYear(start.getFullYear() + duration.Value);
          break;
        case ThyPeriodUnit.Decennary:
          date = new Date(start);
          date.setFullYear(start.getFullYear() + duration.Value);
          break;
      }
      if (date && date > start) {
        date.setSeconds(-1);
      }
      return date;
    }
  }

  /**
   * Decode compact date.
   * @param {string} compact Compact date (Ex: `D7D-6W` - `M1M-1M` - `D7D-6D`)
   * @param {string} compact Compact date new format (Ex: `D7D-2D:o-2D:d7D:sD` - `D1D-3D:o-3D:d1D:sD` - `:o-3D:d1D:sD`)
   */
  public decodeCompactStringToPeriod(compact: string): ThyPeriodModel {
    if (compact) {
      let startPeriod = ThyPeriodUnit.None;
      let samplePeriod = ThyPeriodUnit.None;
      let durationValue = 0;
      let durationUnit = this.getUnitFormChar(compact);
      let offsetValue = 0;
      let offsetUnit = ThyPeriodUnit.None;
      let offsetValue2 = 0;
      let offsetUnit2 = ThyPeriodUnit.None;
      let isEquivalentPeriod = false;
      let isEquivalentWeekDay = false;
      if (compact.indexOf(':') === -1) {
        if (durationUnit !== undefined) {
          if (compact.length > 1) {
            let offset = 1;
            let len = 0;
            // tslint:disable-next-line:curly
            while (len + offset < compact.length && (!isNaN(parseInt(compact[len + offset], 10)) || (len === 0 && compact[len + offset] === '-'))) len++;
            let n = len > 0 ? parseInt(compact.substr(offset, len), 10) : undefined;
            if (n !== undefined) {
              durationValue = n;
              offset += len;
              if (offset < compact.length) {
                offsetUnit = this.getUnitFormChar(compact.substr(offset));
              }
              if (offsetUnit !== undefined && compact.length > offset + 1) {
                offset++;
                len = 0;
                // tslint:disable-next-line:curly
                while (len + offset < compact.length && (!isNaN(parseInt(compact[len + offset], 10)) || (len === 0 && compact[len + offset] === '-'))) len++;
                n = len > 0 ? parseInt(compact.substr(offset, len), 10) : undefined;
                if (n !== undefined) {
                  offsetValue = n;
                  offset += len;
                  if (offset < compact.length) {
                    startPeriod = this.getUnitFormChar(compact.substr(offset));
                    const period = this.getPeriodByUnit(this.today, startPeriod);
                    period.Duration = new ThyPeriodDuration(durationUnit, durationValue);
                    period.Offset = new ThyPeriodDuration(offsetUnit, offsetValue);
                    period.Start = startPeriod;
                    this.shiftPeriod(period, period.Offset.Value, period.Offset.Unit, period.Offset.Value < 0);
                    period.EndDate = this.getEndDateFromDuration(period.StartDate, period.Duration);
                    return period;
                  }
                }
              }
            }
          }
        }
      } else {
        // New format
        let firstOffsetFound = false;
        for (const item of compact.substr(compact.indexOf(':')).split(':')) {
          if (!item) { continue; }
          let durationObj: { value: number, unit: ThyPeriodUnit } = null;
          switch (item[0].toLowerCase()) {
            case 's':
              durationObj = this.deserializeDuration(item.substr(1));
              startPeriod = durationObj.unit;
              break;
            case 't':
              durationObj = this.deserializeDuration(item.substr(1));
              samplePeriod = durationObj.unit;
              break;
            case 'd':
              durationObj = this.deserializeDuration(item.substr(1));
              durationValue = durationObj.value;
              durationUnit = durationObj.unit;
              break;
            case 'o':
              durationObj = this.deserializeDuration(item.substr(1));
              if (!firstOffsetFound) {
                  offsetValue = durationObj.value;
                  offsetUnit = durationObj.unit;
                  firstOffsetFound = true;
              } else {
                  offsetValue2 = durationObj.value;
                  offsetUnit2 = durationObj.unit;
              }
                break;
            case 'e':
              isEquivalentPeriod = true;
                break;
            case 'w':
              isEquivalentWeekDay = true;
              break;
          }
        }
        const duration = new ThyPeriodDuration(durationUnit, durationValue);
        const offset = new ThyPeriodDuration(offsetUnit, offsetValue);
        const offset2 = new ThyPeriodDuration(offsetUnit2, offsetValue2);
        const sample = new ThyPeriodDuration(samplePeriod, 1);
        const start = startPeriod;
        return this.buildPeriodStartEndFromDurationAndOffset(new ThyPeriodModel(null, null, duration, sample, offset, start, offset2, isEquivalentPeriod, isEquivalentWeekDay));
      }
    }
  }

  private deserializeDuration(s: string): { value: number, unit: ThyPeriodUnit } {
    let value = 0;
    let periodUnit = ThyPeriodUnit.None;
    let n = s[0] === '-' ? 1 : 0;
    while (n < s.length && !isNaN(parseInt(s[n], 10))) {
      n++;
    }
    if (n === 0) {
      value = 1;
    } else {
      value = parseInt(s.substr(0, n), 10);
    }
    if ((n === 0 || !isNaN(value)) && n < s.length) {
      periodUnit = this.resolveCharToUnit(s.substr(n, 1));
    }
    return { value: value, unit: periodUnit };
  }

  public encodeToCompactString(period: ThyPeriodModel): string {
    let ret = '';
    if (period) {
      const duration = period.Duration && period.Duration.Unit && period.Duration.Value ? this.getCharFormUnit(period.Duration.Unit) + period.Duration.Value : 'N0';
      const offset = period.Offset && period.Offset.Unit && period.Offset.Value ? this.getCharFormUnit(period.Offset.Unit) + period.Offset.Value : 'N0';
      const start = period.Start ? this.getCharFormUnit(period.Start) : 'N';
      ret = `${duration}${offset}${start}`;
      if (period.Offset.Value && period.Offset.Unit) {
        ret += `:o${period.Offset.Value}${this.resolveUnitToChar(period.Offset.Unit)}`;
      }
      if (period.Offset2.Value && period.Offset2.Unit) {
        ret += `:o${period.Offset2.Value}${this.resolveUnitToChar(period.Offset2.Unit)}`;
      }
      if (period.Duration.Value && period.Duration.Unit) {
        ret += `:d${period.Duration.Value}${this.resolveUnitToChar(period.Duration.Unit)}`;
      }
      if (period.Start) {
        ret += `:s${this.resolveUnitToChar(period.Start)}`;
      }
      if (period.SampleDuration.Unit) {
        ret += `:t${this.resolveUnitToChar(period.SampleDuration.Unit)}`;
      }
      if (period.IsEquivalentPeriod) {
        ret += ':e';
      }
      if (period.IsEquivalentWeekDay) {
        ret += ':w';
      }
      return ret;
    }
  }

  private getUnitFormChar(s: string) {
    switch (s.toUpperCase()[0]) {
        case 'N':
            return 0;
        case 'H':
            return 3;
        case 'D':
            return 4;
        case 'W':
            return 5;
        case 'M':
            return 6;
        case 'Y':
            return 7;
    }
    return null;
  }

  private getCharFormUnit(u: ThyPeriodUnit) {
    switch (u) {
        case 0:
            return 'N';
        case 3:
            return 'H';
        case 4:
            return 'D';
        case 5:
            return 'W';
        case 6:
            return 'M';
        case 7:
            return 'Y';
    }
    return null;
  }

  public getSingularByUnit(unit: ThyPeriodUnit, forPrint = false) {
    switch (unit) {
      case ThyPeriodUnit.Hour:
        return 'Hour';
      case ThyPeriodUnit.Day:
        return 'Day';
      case ThyPeriodUnit.Week:
        return 'Week';
      case ThyPeriodUnit.Month:
        return 'Month';
      case ThyPeriodUnit.Year:
        return 'Year';
      case ThyPeriodUnit.Decennary:
        return forPrint ? 'Decade' : ThyPeriodUnitStr.Decennary;
      default:
        return null;
    }
  }

  /**
   * Build a period from a period object. With proprrty `start: ThyPeriodUnit`, `duration: ThyPeriodDuration`, `offset: ThyPeriodDuration`
   * @param period
   */
  public buildPeriodStartEndFromDurationAndOffset(period: ThyPeriodModel): ThyPeriodModel {
    if (!period || !period.Start || !period.Duration || !period.Offset) { return period; }
    const newPeriod = this.getPeriodByUnit(this.today, period.Start);
    newPeriod.Start = period.Start;
    newPeriod.Offset = period.Offset;
    newPeriod.Offset2 = period.Offset2;
    newPeriod.Duration = period.Duration;
    newPeriod.SampleDuration = period.SampleDuration;
    newPeriod.IsEquivalentPeriod = period.IsEquivalentPeriod;
    newPeriod.IsEquivalentWeekDay = period.IsEquivalentWeekDay;
    const equivalentTime = newPeriod.IsEquivalentPeriod ? this.today.getTime() - newPeriod.StartDate.getTime() : null;
    this.shiftPeriod(newPeriod, period.Offset.Value, period.Offset.Unit, period.Offset.Value < 0);
    if (newPeriod.Offset2.Value) {
      this.shiftPeriod(newPeriod, period.Offset2.Value, period.Offset2.Unit, period.Offset2.Value < 0);
    }
    newPeriod.EndDate = equivalentTime ? new Date(newPeriod.StartDate.getTime() + equivalentTime) : this.getEndDateFromDuration(newPeriod.StartDate, period.Duration);
    return newPeriod;
  }

  /**
   * @param {ThyPeriodModel} period Period reference to shift
   * @param {number} offset
   * @param {ThyPeriodUnit} unit Period unit `ThyPeriodUnit`
   * @param {boolean} remove Is remove offset by unit (default: `false`)
   */
  public shiftPeriod(period: ThyPeriodModel, offset: number, unit: ThyPeriodUnit, remove = false, readjust = true) {
    switch (unit) {
      case ThyPeriodUnit.Hour:
        this.shiftByHours(period, offset, remove);
        break;
      case ThyPeriodUnit.Day:
        this.shiftByDays(period, offset, remove);
        break;
      case ThyPeriodUnit.Week:
        this.shiftByWeeks(period, offset, remove);
        break;
      case ThyPeriodUnit.Month:
        this.shiftByMonths(period, offset, remove, readjust);
        break;
      case ThyPeriodUnit.Year:
        this.shiftByYears(period, offset, remove);
        break;
      case ThyPeriodUnit.Decennary:
        this.shiftByDecennaries(period, offset, remove);
        break;
    }
  }

  public shiftDate(date: Date, offset: number, unit: ThyPeriodUnit) {
    switch (unit) {
      case ThyPeriodUnit.Hour:
        date.setHours(date.getHours() + offset);
        return date;
      case ThyPeriodUnit.Day:
        date.setDate(date.getDate() + offset);
        return date;
      case ThyPeriodUnit.Week:
        date.setDate(date.getDate() + (7 * offset));
        return date;
      case ThyPeriodUnit.Month:
        date.setMonth(date.getMonth() + offset);
        return date;
      case ThyPeriodUnit.Year:
        date.setFullYear(date.getFullYear() + offset);
        return date;
    }
  }

  public shiftByHours(period: ThyPeriodModel, offset: number, remove = false): any {
    offset = remove ? offset < 0 ? offset : -offset : Math.abs(offset);
    period.StartDate.setHours(period.StartDate.getHours() + offset);
    period.EndDate.setHours(period.EndDate.getHours() + offset);
  }

  public shiftByDays(period: ThyPeriodModel, offset: number, remove = false): any {
    offset = remove ? offset < 0 ? offset : -offset : Math.abs(offset);
    period.StartDate.setDate(period.StartDate.getDate() + offset);
    period.EndDate.setDate(period.EndDate.getDate() + offset);
  }

  public shiftByWeeks(period: ThyPeriodModel, offset: number, remove = false): any {
    offset = remove ? offset < 0 ? offset : -offset : Math.abs(offset);
    period.StartDate.setDate(period.StartDate.getDate() + (7 * offset));
    period.EndDate.setDate(period.EndDate.getDate() + (7 * offset));
  }

  public shiftByMonths(period: ThyPeriodModel, offset: number, remove = false, readjust = true): any {
    offset = remove ? offset < 0 ? offset : -offset : Math.abs(offset);
    period.StartDate.setMonth(period.StartDate.getMonth() + offset);
    if (readjust) {
      period.EndDate.setDate(1);
      period.EndDate.setMonth(period.EndDate.getMonth() + (offset + 1));
      period.EndDate.setDate(0);
    } else {
      period.EndDate.setMonth(period.EndDate.getMonth() + offset);
    }
  }

  public shiftByYears(period: ThyPeriodModel, offset: number, remove = false): any {
    offset = remove ? offset < 0 ? offset : -offset : Math.abs(offset);
    period.StartDate.setFullYear(period.StartDate.getFullYear() + offset);
    period.EndDate.setFullYear(period.EndDate.getFullYear() + offset);
  }

  public shiftByDecennaries(period: ThyPeriodModel, offset: number, remove = false): any {
    offset = remove ? offset < 0 ? offset : -offset : Math.abs(offset);
    period.StartDate.setFullYear(period.StartDate.getFullYear() + offset);
    period.EndDate.setFullYear(period.EndDate.getFullYear() + offset);
  }

}
