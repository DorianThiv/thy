import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThyChart2Component } from '../thy-chart2.component';
import * as Highcharts from 'highcharts';
import { ThyTranslateService } from '../../../thy-services/thy-translate';
import { ThyFormatService } from '../../../thy-services/thy-format/thy-format.service';
import { ThyChartGraphLegendEvent } from '../models/thy-chart-graph-legend-event.class';

declare var require: any;

const Boost = require('highcharts/modules/boost');
Boost(Highcharts);

@Component({
  selector: 'app-thy-graph',
  templateUrl: '../thy-chart2.component.html',
  styleUrls: ['./thy-graph.component.scss']
})
export class ThyGraphComponent extends ThyChart2Component {

  @Input() loading = false;
  @Input() boost = true;
  @Input() title = null;
  @Input() legend = true;
  @Input() animation = true;
  @Input() shared = false;
  @Input() markers = false;
  @Input() plotShadow = false;
  @Input() fontColor: string;
  @Input() stacking: 'percent' | 'normal';

  public series: any[];
  public axisY: Highcharts.YAxisOptions[];
  public axisX: Highcharts.XAxisOptions[];

  @Output() click = new EventEmitter<any>();

  constructor(translateService: ThyTranslateService, protected formatService: ThyFormatService) {
    super(translateService, formatService);
  }

  public initialize() {
    const tooltipHeader = `<span style="font-size: ${this.fontSize ? `${this.fontSize / 1.2}px` : '10px'}">{point.key}</span><br/>`;
    const tooltipFormat = `<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}</b><br/>`;
    const isStack = this.series && this.series.filter(s => s.stack).length > 0;
    if (isStack) {
      this.shared = true;
    }
    const fontSize = this.fontSize ? `${this.fontSize}px` : '12px';
    if (fontSize) {
      if (this.axisY) {
        this.axisY.forEach(y => {
          // Title
          y.showEmpty = false;
          if (y.title) {
            y.title.style = {
              fontSize: fontSize,
              color: this.fontColor
            };
          } else {
            y.title = {
              style: {
                fontSize: fontSize,
                color: this.fontColor
              }
            };
          }
          // Labels
          y.labels = {
            style: {
              fontSize: fontSize,
              color: this.fontColor
            }
          };
        });
      }
      if (this.axisX) {
        this.axisX.forEach(x => {
          x.labels = { style: { fontSize: fontSize, color: this.fontColor } };
          x.crosshair = this.crosshair ? { width: 1, color: '#bbb' } : null;
        });
      }
    }
    this.chartOptions = {
      chart: {
        animation: this.animation,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        panKey: 'ctrl',
        zoomType: 'x',
        zoomKey: 'shift',
        events: {
          render: this.loaded
        }
      },
      credits: {
        enabled: false
      },
      boost: {
        enabled: this.boost
      },
      title: {
        text: this.title
      },
      legend: {
        enabled: this.legend,
        itemStyle: {
          fontSize: fontSize,
          color: this.fontColor
        }
      },
      time: {
        useUTC: false,
        timezoneOffset: new Date().getTimezoneOffset(),
      },
      tooltip: {
        enabled: true,
        shared: this.shared,
        headerFormat: tooltipHeader,
        pointFormat: tooltipFormat,
        style: {
          fontSize: fontSize
        }
      },
      scrollbar: {
        enabled: true
      },
      plotOptions: {
        column: {
          stacking: isStack ? 'normal' : undefined
        },
        series: {
          animation: this.animation,
          marker: {
            enabled: this.markers,
          },
          states: {
            hover: {
              enabled: false
            },
            inactive: {
              opacity: 1
            }
          },
          events: {
            click: (event) => this.onClick(event),
            legendItemClick: (event) => this.onLegendClick(event)
          }
        }
      },
      series: (this.series as Highcharts.SeriesOptionsType[]),
      xAxis: this.axisX,
      yAxis: !this.axisY ? [{ title: { text: '' } }] : this.axisY,
    };
    this.resize();
  }

  public onLegendClick(event: Highcharts.SeriesLegendItemClickEventObject) {
    const thyEvent = new ThyChartGraphLegendEvent(event);
    this.legendClick.emit(event);
  }
}
