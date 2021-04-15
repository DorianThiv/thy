import { Component, ViewChild, ElementRef, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { ThyTranslateService } from '../thy-translate';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ThyFormatService } from '../thy-format/thy-format.service';

@Component({
  selector: 'thy-chart2',
  templateUrl: './thy-chart2.component.html',
  styleUrls: ['./thy-chart2.component.scss']
})
export class ThyChart2Component implements DoCheck {

  @ViewChild('container', { static: false }) container: ElementRef;
  @ViewChild('chart', { static: false }) chartElement: HighchartsChartComponent;
  @ViewChild('menu', { static: false }) menu: MatMenu;
  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;

  @Input() loading = false;
  @Input() classes: string[];
  @Input() resizable = true;
  @Input() title = null;
  @Input() legend = true;
  @Input() animation = true;
  @Input() crosshair = false;
  @Input() shared = false;
  @Input() markers = false;
  @Input() plotShadow = false;
  @Input() height = '100%';
  @Input() paddingTop = 10;
  @Input() fontSize: number;
  @Input() showContextMenu = true;

  @Output() click = new EventEmitter<any>();
  @Output() legendClick = new EventEmitter<Highcharts.SeriesLegendItemClickEventObject>();
  @Output() instanceEvent = new EventEmitter<any>();

  public Highcharts = Highcharts;
  public chartConstructor = 'chart';
  public chartOptions: Highcharts.Options;
  public updateFlag = false;
  public oneToOneFlag = true;
  public runOutsideAngularFlag = false;

  protected chart: Highcharts.Chart;

  protected containerWidth = 0;
  protected containerHeight = 0;

  protected initialized = false;

  public contextMenuPosition = { x: 0, y: 0 };

  public get legendItems(): any[] { return this.chart ? this.chart.legend.allItems : []; }

  public get classesList() {
    let classes = [];
    if (this.classes) {
      classes = this.classes;
    }
    if (this.plotShadow) {
      classes.push('mat-elevation-z1');
    }
    return classes;
  }

  constructor(protected translateService: ThyTranslateService, protected formatService: ThyFormatService) {
    Highcharts.setOptions(<Highcharts.Options>{
      lang: {
        shortWeekdays: this.translateService.shortDays,
        shortMonths: this.translateService.shortMonth,
        weekdays: this.translateService.days,
        months: this.translateService.months
      },
    });
  }

  ngDoCheck() {
    if (this.container && this.resizable) {
      if (this.container.nativeElement.offsetWidth !== this.containerWidth || this.container.nativeElement.offsetHeight !== this.containerHeight) {
        this.containerWidth = this.container.nativeElement.offsetWidth;
        this.containerHeight = this.container.nativeElement.offsetHeight;
        setTimeout(() => this.resize(), 1);
      }
    }
  }

  public initialize() {
  }

  public redraw() {
    if (this.chart) {
      this.chart.redraw();
    }
  }

  public resize() {
    if (this.chart) {
      try {
        this.chart.setSize(this.containerWidth, this.containerHeight, { duration: 100 });
      } catch { }
    }
  }

  public clear() {
    if (this.chart) {
      try {
        this.chart.destroy();
      } catch { }
    }
  }

  public loaded() {
    this.loading = !this.loading;
  }

  public onChartInstance(chart: Highcharts.Chart) {
    this.chart = chart;
    this.instanceEvent.emit(chart);
  }

  public onClick(event: any) {
    this.click.emit(event);
  }

  public onContextMenu(event: any) {
    if (this.showContextMenu) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX;
      this.contextMenuPosition.y = event.clientY;
      this.contextMenu.openMenu();
    }
  }

  public onShowMarkers() {
    this.markers = !this.markers;
    this.initialize();
  }

  public onShowCrosshair() {
    this.crosshair = !this.crosshair;
    this.shared = this.crosshair;
    this.initialize();
  }

}
