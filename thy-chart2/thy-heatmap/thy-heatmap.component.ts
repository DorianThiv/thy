import { Component, Input, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts/highcharts';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import { ThyFormatService } from 'src/app/thy-shared/thy-services/thy-format/thy-format.service';
import { ThyTranslateService } from 'src/app/thy-shared/thy-services/thy-translate';
import { isNullOrUndefined } from 'src/app/thy-shared/thy-services/thy-utils-functions/thy-utils-functions.service';
import { ThyChart2Component } from '../thy-chart2.component';

HighchartsHeatmap(Highcharts);

export enum ThyHeatmapPeriod {
  PerDay,
  PerMonth
}

@Component({
  selector: 'app-thy-heatmap',
  templateUrl: '../thy-chart2.component.html',
  styleUrls: ['./thy-heatmap.component.scss']
})
export class ThyHeatmapComponent extends ThyChart2Component {

  @Input() min: number;
  @Input() max: number;
  @Input() axisMin: number;
  @Input() axisMax: number;
  @Input() colorMin = '#ffffff';
  @Input() colorMax = '#c4463a';
  @Input() unit: string;

  public yAxis: any;
  public yCategories: string[];
  public xCategories: string[];
  public data: number[][];

  constructor(translateService: ThyTranslateService, formatService: ThyFormatService) {
    super(translateService, formatService);
  }

  public initialize() {
    // {value:%H-%A-%a-%e-%B-%Y}
    const unit = this.unit ? this.unit : '';
    this.chartOptions = {
      chart: {
          type: 'heatmap'
      },
      boost: {
          useGPUTranslations: true
      },
      title: {
          text: null
      },
      subtitle: {
          text: null
      },
      xAxis: {
        title: {
          text: null
        },
        categories: this.xCategories,
        min: this.axisMin,
        max: this.axisMax
      },
      yAxis: {
        title: {
          text: null
        },
        categories: this.yCategories,
        reversed: true
      },
      // yAxis: this.yAxis,
      colorAxis: {
          stops: [
              [0, this.colorMin],
              // [0.5, '#fffbbc'],
              // [0.9, '#c4463a'],
              [1, this.colorMax]
          ],
          min: this.min,
          max: this.max,
          startOnTick: false,
          endOnTick: false,
          labels: {
              format: `{value} ${unit}`
          }
      },
      tooltip: {
        // headerFormat: this.headerFormat ? `${this.headerFormat}<br/>` : null,
        valueDecimals: 2,
        valueSuffix: unit,
        formatter: function() {
          return `${(this.series.chart.yAxis[0] as any).categories[this.y]}, ${(this.series.chart.xAxis[0] as any).categories[this.point.x]} : ` +
            `<b>${!isNullOrUndefined(this.point.value) ? (this.series as any).userOptions.formatNumber(this.point.value, '0.00') : '-'} ${(this.series as any).userOptions.unit}<b>`;
        }
          // pointFormat: `{point.y:%e %b, %Y} : <b>{point.value} ${unit}`
          // pointFormat: `{point.y}  : <b>{point.value} ${unit}`
      },
      series: ([{
        data: this.data,
        borderWidth: 0.5,
        borderColor: '#eeeeee',
        nullColor: '#ffffff',
        turboThreshold: Number.MAX_VALUE,
        formatNumber: this.formatNumber,
        unit: unit,
      }] as any)
    };
    this.resize();
  }

  public formatNumber(num: any, format?: string) {
    if (num === undefined || num === null) {
      return null;
    }
    if (typeof (num) === 'string') {
      if (num.indexOf(',') !== -1) {
        num = num.replace(',', '.');
      }
      num = Number(num);
    }
    try {
      if (!format) {
        format = num < 10 ? '0.0' : '0';
      }
      // Number format
      format = format.split('#').join('0');
      const hasComma = -1 < format.indexOf(',');
      const stripNonNumeric = (str) => {
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
      let psplit = stripNonNumeric(format).split('.');
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

}
