import { Component, Input } from '@angular/core';
import { ThyChart2Component } from '../thy-chart2.component';
import { ThyTranslateService } from '../../../thy-services/thy-translate';
import { ThyFormatService } from '../../../thy-services/thy-format/thy-format.service';

@Component({
  selector: 'app-thy-pie',
  templateUrl: '../thy-chart2.component.html',
  styleUrls: ['./thy-pie.component.scss']
})
export class ThyPieComponent extends ThyChart2Component {

  @Input() values: { name: string, y: number, unit: string, color: string }[] = [];
  @Input() titleFontSize = 18;
  @Input() fontSize = 11;
  @Input() fontColor: string;
  @Input() fontWeight: string;
  @Input() showConnectors = false;
  @Input() showValues = true;
  @Input() showPercents = true;
  @Input() innerPercents = '0%';

  constructor(translateService: ThyTranslateService, formatService: ThyFormatService) {
    super(translateService, formatService);
  }

  public initialize() {
    const labelFormat = `{point.name}${this.showValues ? ': {point.y:.1f} {point.unit}' : ''}${this.showPercents ? '<br>({point.percentage:.1f} %)' : ''}`;
    const pointFormat = `${this.showValues ? '{point.y:.1f} {point.unit}' : ''}${this.showPercents ? ' - ({point.percentage:.1f}%)' : ''}`;
    const color = this.fontColor ? this.fontColor : '#333';
    this.chartOptions = {
      boost: {
        useGPUTranslations: true
      },
      chart: {
        animation: false,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        plotBackgroundColor: 'rgba(255, 255, 255, 0)',
        plotBorderWidth: 0,
        plotShadow: false,
        borderWidth: 0,
        type: 'pie'
      },
      title: {
        text: this.title ? this.translateService.instant(this.title) : undefined,
        style: {
          fontSize: this.titleFontSize ? `${this.titleFontSize}px` : undefined
        }
      },
      credits: { enabled: false },
      tooltip: {
        pointFormat: pointFormat,
      },
      plotOptions: {
        pie: {
          animation: this.animation,
          size: '90%',
          allowPointSelect: false,
          innerSize: this.innerPercents,
          dataLabels: {
            enabled: true,
            alignTo: 'connectors',
            connectorWidth: this.showConnectors ? 1 : 0,
            distance: 10,
            format: labelFormat,
            style: {
              color: color,
              fontSize: `${this.fontSize}px`,
              fontWeight: this.fontWeight,
              textOutline: '0px'
            }
          }
        }
      },
      pane: {
        size: '100%'
      },
      series: [{
        type: 'pie',
        // @ts-ignore
        colorByPoint: true,
        data: this.values
      }]
    };
  }

}
