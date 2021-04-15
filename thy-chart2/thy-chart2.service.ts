import { Injectable } from '@angular/core';
import { ThyRestGetTrendDataStreamResponse } from '../../thy-services/thy-rest/models/thy-rest-responses.class';
import { ThyAxisYOptions } from './models/thy-chart-options.class';
import { ThyChartSerie } from './models/thy-chart-item.class';
import { ThyHighchartsSeriesType } from './models/thy-chart.enum';
import { ThyChartAxisY } from './models/thy-chart-axis-y.class';
import { ThyFormatService } from '../../thy-services/thy-format/thy-format.service';
import { ThyBarType, ThyGraphType } from './models/thy-chart-type.enum.class';
import { ThyChartAxisX } from './models/thy-chart-axis-x.class';
import { ThyChartPlotBand } from './models/thy-chart-plot-band.class';
import { ThyPeriodService } from '../thy-period/thy-period.service';
import { ThyPeriodModel } from '../thy-period/models/thy-period-model.class';
import { ThyPeriodUnit } from '../thy-period/models/thy-period-unit.enum';

@Injectable({
  providedIn: 'root'
})
export class ThyChart2Service {

  constructor(private periodService: ThyPeriodService, private formatService: ThyFormatService) { }

  public createSerieFromTrendDataStream(model: ThyRestGetTrendDataStreamResponse) {
    if (!model) { return null; }
    const values = [];
    model.Values.forEach(value => values.push([new Date(parseInt(value.d.substr(6), 10)).getTime(), value.v]));
    return { type: 'line', name: model.Name, data: values };
  }

  public createSeriesFromChartItems(items: ThyChartSerie[]): Highcharts.SeriesOptions[] {
    if (!items) { return null; }
    const seriesOptions = [];
    for (const item of items) {
      const options: any = { type: '' };
      options.name = item.Label ? item.Label : item.Name;
      options.type = this.resolveSerieTypeFromGraphType(item.GraphType);
      options.step = item.GraphStep;
      options.color = item.Color && item.Color.startsWith('rgb') ? item.Color : this.formatService.formatColorToHex(item.Color);
      options.yAxis = !item.AxisY || item.AxisY === -1 ? undefined : item.AxisY - 1;
      options.xAxis = !item.AxisX || item.AxisX === -1 ? undefined : item.AxisX - 1;
      if (item.Values) {
        const values = [];
        item.Values.forEach(value => values.push([parseInt(value.d.substr(6), 10), value.v]));
        options.data = values;
      }
      if (item.GraphType === ThyGraphType.Bar) {
        options.pointPadding = 0.05;
        options.groupPadding = 0.05;
        options.pointWidth = null;
      } else if (item.GraphType === ThyGraphType.Area) {
        options.fillColor = item.Color;
      }
      seriesOptions.push(options);
    }
    return seriesOptions;
  }

  /**
   * Use for dashboard and consumption
   */
  public createSeriesFromChartItemsDashboard(items: ThyChartSerie[]): Highcharts.SeriesOptions[] {
    if (!items) { return null; }
    const seriesOptions = [];
    for (const item of items) {
      const options: any = { type: '' };
      options.name = item.Label ? item.Label : item.Name;
      options.model = item;
      options.type = this.resolveSerieTypeFromGraphType(item.GraphType);
      if (item.GraphType === ThyGraphType.Bar && (item.BarType === ThyBarType.Stacked || item.BarType === ThyBarType.Stacked100)) {
        options.stack = 'stack';
      }
      options.step = item.GraphStep;
      options.color = item.Color && item.Color.startsWith('rgb') ? item.Color : this.formatService.formatColorToHex(item.Color);
      options.yAxis = item.AxisY;
      options.xAxis = item.AxisX;
      if (item.Values) {
        const values = [];
        if (item.Offset) {
          const offset = item.Offset < 0 ? Math.abs(item.Offset) : -item.Offset;
          item.Values.forEach(value => values.push([this.periodService.shiftDate(new Date(parseInt(value.d.substr(6), 10)), offset, item.OffsetUnit).getTime(), value.v]));
        } else {
          item.Values.forEach(value => values.push([parseInt(value.d.substr(6), 10), value.v]));
        }
        options.data = values;
      }
      if (item.GraphType === ThyGraphType.Bar) {
        options.pointPadding = 0.05;
        options.groupPadding = 0.05;
        options.pointWidth = null;
      } else if (item.GraphType === ThyGraphType.Area) {
        options.fillColor = item.Color;
      }
      seriesOptions.push(options);
    }
    return seriesOptions;
  }

  public createSeriesFromChartItemsConsumption(items: ThyChartSerie[]): Highcharts.SeriesOptions[] {
    if (!items) { return null; }
    const seriesOptions = [];
    for (const item of items) {
      const options: any = { type: '' };
      options.name = item.Label ? item.Label : item.Name;
      options.model = item;
      options.type = this.resolveSerieTypeFromGraphType(item.GraphType);
      options.step = item.GraphStep;
      options.color = item.Color && item.Color.startsWith('rgb') ? item.Color : this.formatService.formatColorToHex(item.Color);
      options.opacity = item.Opacity;
      options.yAxis = item.AxisY;
      options.xAxis = item.AxisX;
      options.data = item.Values;
      if (item.GraphType === ThyGraphType.Bar) {
        options.pointPadding = 0.05;
        options.groupPadding = 0.05;
        options.pointWidth = null;
      } else if (item.GraphType === ThyGraphType.Area) {
        options.fillColor = item.Color;
      }
      seriesOptions.push(options);
    }
    return seriesOptions;
  }

  public createAxisYFromSeries(series: any[], options = new ThyAxisYOptions({})) {
    if (!series) { return []; }
    let axis = [];
    if (options.oneAxis) {
    } else {
      axis = options.noAxisLabels ? series.map(s => ({ title: { text: '' } })) : series.map(s => ({ title: { text: s.name } }));
    }
    return axis;
  }

  public createAxisYFromChartAxis(items: ThyChartSerie[], axis: ThyChartAxisY[] = [], useVisible = true): Highcharts.YAxisOptions[] {
    if (!items) { return []; }
    const axisOptions = [];
    let idx = 0;
    if (axis && axis.length > 0) {
      for (const ax of axis) {
        const options: Highcharts.YAxisOptions = { };
        options.title = { text: ax.Label };
        options.min = ax.Min;
        options.max = ax.Max;
        options.opposite = ax.Position;
        options.visible = useVisible ? items.filter(i => i.AxisY === idx).length === 0 ? false : true : true;
        // options.tickInterval = options.min || options.max ? 1 : undefined;
        axisOptions.push(options);
        idx++;
      }
    } else {
      axisOptions.push({ title: { text: '' } });
    }
    return axisOptions;
  }

  public createAxisXFromPeriod(period: ThyPeriodModel, visible = true): Highcharts.XAxisOptions {
    if (!period) { return { type: 'datetime' }; }
    return { type: 'datetime', min: period.StartDate.getTime(), max: period.EndDate.getTime(), visible: visible };
  }

  public createAxisX(axesX: ThyChartAxisX): Highcharts.XAxisOptions {
    if (!axesX || !axesX.Period) { return { type: 'datetime' }; }
    const weekends: ThyChartPlotBand[] = [];
    if (axesX.DisplayWeekends) {
      const duration = this.formatService.formatDatesToDuration(axesX.Period.StartDate, axesX.Period.EndDate);
      if (duration && duration.days < 360) {
        let saturday: Date = new Date(axesX.Period.StartDate);
        if (axesX.Period.StartDate.getDay() === 0) {
          saturday.setDate(saturday.getDate() - 1);
        } else {
          for (let i = axesX.Period.StartDate.getDay(); i !== 6 ; i++) {
            saturday.setDate(saturday.getDate() + 1);
          }
        }
        while (saturday < axesX.Period.EndDate) {
          const plot = new ThyChartPlotBand();
          plot.color = 'rgba(225, 225, 225, 0.5)';
          plot.from = saturday;
          const sunday = new Date(saturday);
          sunday.setDate(sunday.getDate() + 1);
          sunday.setHours(23);
          sunday.setMinutes(59);
          sunday.setSeconds(59);
          plot.to = sunday;
          weekends.push(plot);
          saturday = new Date(saturday);
          saturday.setDate(saturday.getDate() + 7);
        }
      }
    }
    return {
      type: 'datetime',
      min: axesX.Period.StartDate.getTime(),
      max: axesX.Period.EndDate.getTime(),
      plotBands: weekends,
      visible: axesX.Visible
    };
  }

  public createCategoriesAxisX(categories: string[]): Highcharts.XAxisOptions {
    return { type: 'category', categories: categories };
  }

  private resolveSerieTypeFromGraphType(type: ThyGraphType) {
    switch (type) {
      case ThyGraphType.Line:
        return ThyHighchartsSeriesType.line;
      case ThyGraphType.SmoothLine:
        return ThyHighchartsSeriesType.spline;
      case ThyGraphType.Bar:
          return ThyHighchartsSeriesType.column;
      case ThyGraphType.Area:
          return ThyHighchartsSeriesType.areaspline;
      default:
        return ThyHighchartsSeriesType.line;
    }
  }

}
