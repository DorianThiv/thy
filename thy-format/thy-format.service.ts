import { Injectable } from '@angular/core';
import { ThyPeriodModel } from '../thy-period/models/thy-period-model.class';
import { ThyPeriodUnit } from '../thy-period/models/thy-period-unit.enum';
import { ThyTranslateService } from '../thy-translate';
import { isNullOrUndefined, isNumber } from '../thy-utils-functions/thy-utils-functions.service';

export interface ThyFormatColorOpacity {
  color: string;
  opacity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ThyFormatService {

  constructor(private translateService: ThyTranslateService) { }

  public replaceUrls(message: string) {
    if(!message) return;
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (url) {
      var hyperlink = url;
      if (!hyperlink.match('^https?:\/\/')) {
        hyperlink = 'http://' + hyperlink;
      }
      return '<a href="' + hyperlink + '">' + url + '</a>'
    });
  }

  public static formatDateToMicrosoftStatic(date: Date): string {
    return date ? `\/Date(${date.getTime().toString()}+0${(-(date.getTimezoneOffset() / 60)) * 100})\/` : null;
  }

  public static formatColorToHex(color: string) {
    if (!color) { return; }
    if (color.startsWith('rgb(')) {
      const slice = color.slice(4, color.length - 1);
      const digits = slice.split(',');
      const hexs = digits.map(d => parseInt(d, 10).toString(16));
      const hex = '#' + hexs[0] + hexs[1] + hexs[2];
      return hex;
    } else if (color.startsWith('rgba(')) {
      const slice = color.slice(5, color.length - 1);
      const digits = slice.split(',');
      const hexs = digits.map(d => d.indexOf('.') !== -1 ? ('0' + Math.round((parseFloat(d) * 255)).toString(16)).slice(-2) : ('0' + Number(d).toString(16)).slice(-2));
      const hex = '#' + hexs[3] + hexs[0] + hexs[1] + hexs[2];
      return hex;
    } else if (color.startsWith('#')) {
      switch (color.length) {
        case 7:
          return color;
        case 9:
          if (Number(color[1] + color[2]) === 0) {
            return null;
          }
          return '#' + color.substr(3, 6);
        default:
          return color;
      }
    } else {
      return color;
    }
  }

  public formatMicrosoftToDate(microsoftDate: string): Date {
    if (!microsoftDate) { return null; }
    const times = parseInt(microsoftDate.substr(6), 10);
    const isPositif = microsoftDate.indexOf('+') ? true : false;
    const splittedDate = isPositif ? microsoftDate.split('+') : microsoftDate.split('-');
    const endIdx = splittedDate[1].indexOf(')');
    const offset = splittedDate[1].substr(0, endIdx);
    const hours = Number(offset.substr(0, offset.length - 2)) * 3600 * 1000;
    const minutes = Number(offset.substr(offset.length - 2, offset.length)) * 60 * 1000;
    const realTimes = times + hours + minutes;
    return new Date(realTimes);
  }

  public formatMicrosoftToMilliseconds(microsoftDate: string): number {
    if (!microsoftDate) { return null; }
    return parseInt(microsoftDate.substr(6), 10);
  }

  public deserializeDate(microsoftDate: string) {
    if (!microsoftDate) { return null; }
    const times = parseInt(microsoftDate.substr(6), 10);
    return new Date(times);
  }

  public serializeDate(date: Date): string {
    if (!date) { return null; }
    const timeOffset = (-(date.getTimezoneOffset() / 60)) * 100;
    return date ? `\/Date(${date.getTime().toString()}${timeOffset >= 0 ? '+' : '-'}${timeOffset})\/` : null;
  }

  public formatDateToMicrosoft(date: Date): string {
    if (!date) { return null; }
    const timeOffset = (-(date.getTimezoneOffset() / 60)) * 100;
    return date ? `\/Date(${date.getTime().toString()}${timeOffset >= 0 ? '+' : '-'}${timeOffset})\/` : null;
  }

  /**
   * Format a value even there is no format
   */
  public formatValue(value: number, format: string = null): string {
      if (!format) {
          const ad = value < 0.0 ? -value : value;
          if (ad >= 100.0) {
            return this.formatNumber(ad, '0');
          }
          if (ad >= 1.0) {
            return this.formatNumber(value, '0.0');
          }
          if (ad >= 0.1) {
            return this.formatNumber('0.00');
          }
          if (ad >= 0.001) {
            this.formatNumber('0.000');
          }
      }
      return this.formatNumber(value, format);
  }

  public formatNumber(num: any, format?: string) {
    if (isNullOrUndefined(num) || !isNumber(num)) {
      return num;
    }
    if (typeof(num) === 'string') {
      if (num.indexOf(',') !== -1) {
        num = num.replace(',', '.');
      }
      num = Number(num);
    }
    try {
      if (!format) {
        const ad = num < 0.0 ? -num : num;
        if (ad >= 10.0) {
          format = '0';
        } else if (ad >= 1.0) {
          format = '0.#';
        } else if (ad >= 0.1) {
          format = '0.##';
        } else if (ad >= 0.001) {
          format = '0.###';
        } else {
          format = '0.####';
        }
      }
      // Number format
      format = format.split('#').join('0');
      const hasComma = -1 < format.indexOf(',');
      let psplit = this.stripNonNumeric(format).split('.');
      const that = num;
      let fnum: string;

      // compute precision
      if (1 < psplit.length) {
        // fix number precision
        fnum = that.toFixed(psplit[1].length);
      } else if (2 < psplit.length) {
        throw new Error(('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format));
      } else {
        fnum = that.toFixed(0);
      }

      // format has comma, then compute commas
      if (hasComma) {
        // remove precision for computation
        psplit = fnum.split('.');

        const cnum = psplit[0],
          parr = [],
          j = cnum.length;
        let m = Math.floor(j / 3);
        let n = cnum.length % 3 || 3; // n cannot be ZERO or causes infinite loop

        // break the number into chunks of 3 digits; first chunk may be less than 3
        for (let i = 0; i < j; i += n) {
          if (i !== 0) {
            n = 3;
          }
          parr[parr.length] = cnum.substr(i, n);
          m -= 1;
        }

        // put chunks back together, separated by comma
        fnum = parr.join(',');

        // add the precision back in
        if (psplit[1]) {
          fnum += '.' + psplit[1];
        }
      }

      // replace the number portion of the format with fnum
      return format.replace(/[\d,?\.?]+/, fnum).replace('\\%', '%');
    } catch (error) {
    }
    return '';
  }

  // This function removes non-numeric characters
  public stripNonNumeric(str) {
    str += '';
    const rgx = /^\d|\.|-$/;
    let out = '';
    for (let i = 0; i < str.length; i++) {
      if (rgx.test(str.charAt(i))) {
        if (!((str.charAt(i) === '.' && out.indexOf('.') !== -1) ||
          (str.charAt(i) === '-' && out.length !== 0))) {
          out += str.charAt(i);
        }
      }
    }
    return out;
  }

  /**
   * `rgb`, `rgba`, `ahex` to `hex`
   * @param {string} color Color to convert.
   * @returns The hex color of given value.
   */
  public formatColorToHex(color: string) {
    if (!color) { return null; }
    if (color.startsWith('rgb(')) {
      const slice = color.slice(4, color.length - 1);
      const digits = slice.split(',');
      const hexs = digits.map(d => parseInt(d, 10).toString(16));
      const hex = '#' + hexs[0] + hexs[1] + hexs[2];
      return hex;
    } else if (color.startsWith('rgba(')) {
      const slice = color.slice(5, color.length - 1);
      const digits = slice.split(',');
      const hexs = digits.map(d => d.indexOf('.') !== -1 ? ('0' + Math.round((parseFloat(d) * 255)).toString(16)).slice(-2) : ('0' + Number(d).toString(16)).slice(-2));
      const hex = '#' + hexs[3] + hexs[0] + hexs[1] + hexs[2];
      return hex;
    } else if (color.startsWith('#')) {
      switch (color.length) {
        case 7:
          return color;
        case 9:
          if (Number(color[1] + color[2]) === 0) {
            return null;
          }
          return '#' + color.substr(3, 6);
        default:
          return color;
      }
    } else {
      return color && !color.startsWith('#') ? `#${color}` : color;
    }
  }

  public formatColorToRgba(color: string, transparency?: number) {
    if (!color) { return; }
    if (color.startsWith('rgb(')) {
      return color;
    } else if (color.startsWith('rgba(')) {
      return color;
    } else if (color.startsWith('#')) {
      switch (color.length) {
        case 7:
          const rgb = color.slice(1, color.length);
          const rgbFormated = `rgb(${parseInt(rgb[0] + rgb[1], 16)},${parseInt(rgb[2] + rgb[3], 16)},${parseInt(rgb[4] + rgb[5], 16)})`;
          return rgbFormated;
        case 9:
          const rgba = color.slice(1, color.length);
          const rgbaFormated = `rgba(${parseInt(rgba[2] + rgba[3], 16)},${parseInt(rgba[4] + rgba[5], 16)},${parseInt(rgba[6] + rgba[7], 16)},${this.formatNumber(parseInt(rgba[0] + rgba[1], 16) / 255, `${transparency ? transparency : '0.00'}`)})`;
          return rgbaFormated;
        default:
          return color;
      }
    } else {
      return color;
    }
  }

  public isTransparent(color: string) {
    if (!color) { return; }
    let ret = false;
    if (color.startsWith('rgba(') && color.slice(1, 2) === '') {
      const slice = color.slice(5, color.length - 1);
      const digits = slice.split(',');
      ret = Math.round((parseFloat(digits[3]) * 255)) === 0;
    } else if (color.startsWith('#') && color.length === 9 && color.slice(1, 3) === '00') {
      ret = true;
    } else {
      ret = false;
    }
    return ret;
  }

  public formatDatesToDuration(date1: Date, date2: Date) {
    let delta = Math.abs(date1.getTime() - date2.getTime()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= days * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const secondes = Math.floor(delta) % 60;
    return { days: days, hours: hours, minutes: minutes, secondes: secondes };
  }

  /**
   * Replace attributes inside `{}`
   * @param str
   */
  public replaceAttributes(service: any, str: string, id?: number, period?: ThyPeriodModel) {
    if (!str || !service) { return str; }
    const count = (str.match(/{/g) || []).length;
    if (!count) { return str; }
    for (let i = 0; i < count; i++) {
      const start = str.indexOf('{');
      const end = str.indexOf('}');
      const attribute = str.substring(start + 1, end);
      str = str.replace(`{${attribute}}`, service.replaceAttribute(attribute, id, period));
    }
    return str;
  }

  /**
     * @todo Remove possibilty to parse a string date inside this method.
     * Check all references to be sure about this change.
     * @param {Date} date Must be only `typeof Date`.
     * @param {ThyPeriodUnit} unit `ThyPeriodUnit`
     */
    public formatDate(date: Date | string, unit: ThyPeriodUnit) {
      if (date) {
          try {
              if (typeof(date) === 'string') {
                  date = new Date(parseInt(date.substr(6), 10));
              }
              // switch (unit) {
              //     case ThyPeriodUnit.Hour:
              //         return this.intl.formatDate(date, this.translateService.getCurrentLongPatternHours(), this.translateService.getCurrentLang());
              //     case ThyPeriodUnit.Day:
              //         return this.intl.formatDate(date, this.translateService.getCurrentLongPattern(), this.translateService.getCurrentLang());
              //     case ThyPeriodUnit.Month:
              //     case ThyPeriodUnit.Year:
              //         return this.intl.formatDate(date, this.translateService.getCurrentMonthPattern(), this.translateService.getCurrentLang());
              //     default:
              //         return this.intl.formatDate(date, this.translateService.getCurrentShortPattern(), this.translateService.getCurrentLang());
              // }
          } catch (error) {
              console.log(error);
          }
      }
  }

  public formatDuration(days: number, hours: number, minutes: number, secondes: number): string {
      return `${days} ${this.translateService.instant(days === 1 ? '@global-day' : '@global-days')} ${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
  }

  public formatDurationConditional(days: number, hours: number, minutes: number, secondes: number): string {
      if (days) {
          return `${days} ${this.translateService.instant(days === 1 ? '@global-day' : '@global-days')} ${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
      } else if (hours) {
          return `${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
      } else if (minutes) {
          return `00:${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
      } else if (secondes) {
          return `${secondes} s`;
      } else {
          return isNaN(minutes) || isNaN(secondes) ? '0' : `${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
      }
  }

  private formatDigit(digit: number) {
      if (isNaN(digit)) { return ''; }
      return digit > 9 ? '' + digit : '0' + digit;
  }

}
