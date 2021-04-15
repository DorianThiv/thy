import { Component, OnInit, Input } from '@angular/core';
import { ThyChart2Component } from '../thy-chart2.component';
import { ThyTranslateService } from '../../thy-translate';

import * as Highcharts from 'highcharts/highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more.src';
import * as HighchartsSolidGauge from 'highcharts/modules/solid-gauge.src';
import { ThyFormatService } from '../../thy-format/thy-format.service';

// @ts-ignore
HighchartsMore(Highcharts);
// @ts-ignore
HighchartsSolidGauge(Highcharts);

@Component({
selector: 'app-thy-gauge',
templateUrl: '../thy-chart2.component.html',
styleUrls: ['./thy-gauge.component.scss']
})
export class ThyGaugeComponent extends ThyChart2Component {

    public chartOptions: any;

    @Input() type: 'gauge' | 'solidgauge' | 'circle' = 'gauge';
    @Input() min = 0;
    @Input() max = 100;
    @Input() name: number;
    @Input() value = 0;
    @Input() format: string;
    @Input() unit: string;
    @Input() ranges: { from: number, to: number, color: string }[];
    @Input() serieColor: string;
    @Input() fontColor = '#333';
    @Input() fontSize = 11;
    @Input() titleAxis: string;

    public get fFontSize(): string { return this.fontSize ? `${this.fontSize}px` : undefined; }
    public get fSerieColor(): string { return this.serieColor ? this.serieColor : Highcharts.getOptions().colors[0]; }

    constructor(translateService: ThyTranslateService, formatService: ThyFormatService) {
        super(translateService, formatService);
    }

    public initialize() {
        if (this.initialized) {
            this.update();
            return;
        }
        switch (this.type) {
            case 'solidgauge':
                this.chartOptions = this.solidgaugeConfig();
                break;
            case 'circle': 
                this.chartOptions = this.circleGauge();
                break;
            default:
                this.chartOptions = this.gaugeConfig();
                break;
        }
        this.resize();
        this.initialized = true;
    }

    private update() {
        const serie = this.chart.series[0];
        const point = serie.points[0];
        point.update(this.value);
        // this.redraw();
    }

    private gaugeConfig() {
        const fontSize = this.fontSize ? `${this.fontSize}px` : this.fontSize;
        return {
            chart: {
                animation: this.animation,
                type: 'gauge',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                plotBackgroundColor: 'rgba(255, 255, 255, 0)',
                plotBorderWidth: 0,
                plotShadow: false,
                style: {
                    fontSize: fontSize
                }
            },
            title: { text: null },
            credits: { enabled: false },
            plotOptions: {
                gauge: {
                    animation: false,
                    dataLabels: {
                        y: 60,
                        style: {
                            fontSize: fontSize
                        }
                    }
                }
            },
            pane: {
                startAngle: -130,
                endAngle: 130,
                size: '95%',
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '104%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '102%'
                }, {
                    // default background
                    outerRadius: '100%'
                }]
            },
            yAxis: {
                min: this.min,
                max: this.max,
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 5,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    style: {
                        fontSize: fontSize
                    }
                },
                title: {
                    text: this.titleAxis
                },
                plotBands: this.ranges
            },
            series: [{
                name: this.name,
                type: 'gauge',
                data: [this.value],
                tooltip: {
                    valueSuffix: this.unit ? ` ${this.unit}` : null
                }
            }]
        };
    }

    private solidgaugeConfig() {
        const fontSize = this.fontSize ? `${this.fontSize}px` : this.fontSize;
        return {
            chart: {
                type: 'solidgauge',
                animation: this.animation,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                plotBackgroundColor: 'rgba(255, 255, 255, 0)',
                style: {
                    fontSize: fontSize
                }
            },
            title: { text: null },
            credits: { enabled: false },
            pane: {
                center: ['50%', '75%'],
                size: '100%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc',
                    borderWidth: 0
                }
            },
            exporting: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            // the value axis
            yAxis: {
                min: this.min,
                max: this.max,
                stops: this.ranges ? this.ranges.map(m => [(m.from - this.min) / (this.max - this.min), m.color]) : undefined, // Interval 0 --> 1
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                tickInterval: 0,
                // title: {
                //     y: -70
                // },
                labels: {
                    y: this.fontSize + 5,
                    step: 0,
                    style: {
                        color: this.fontColor,
                        fontSize: this.fontSize / 1.5
                    }
                },
                // plotBands: this.ranges
            },
            series: [{
                name: this.name,
                type: 'solidgauge',
                data: [this.value],
                tooltip: {
                    valueSuffix: this.unit ? ` ${this.unit}` : null
                }
            }],
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        borderWidth: 0,
                        y: (this.container.nativeElement.offsetHeight / 50) - this.fontSize * 2, // Définir la hauteur par le ratio du container
                        useHTML: true,
                        format:
                            `<div style="text-align:center">
                                <span style="font-size:${this.fFontSize}">{point.y}${this.unit ? ` ${this.unit}` : ''}</span><br/>
                            </div>`,
                        style: {
                            color: this.fontColor,
                            fontSize: fontSize
                        }
                    },
                }
            }
        };
    }

    private circleGauge() {
        return {
            chart: {
                type: 'solidgauge',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                plotBackgroundColor: 'rgba(255, 255, 255, 0)',
            },
            title: {
                text: null
            },
            credits: { enabled: false },
            tooltip: {
                enabled: false,
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Move
                    outerRadius: '112%',
                    innerRadius: '88%',
                    backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                    borderWidth: 0
                }]
            },
            yAxis: {
                min: this.min,
                max: this.max,
                lineWidth: 0,
                tickPositions: []
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        borderWidth: 0,
                        backgroundColor: 'none',
                        shadow: false,
                        y: -this.fontSize / 1.2,
                        style: {
                            fontSize: this.fFontSize
                        },
                        format: `<span style="color:${this.fontColor ? this.fontColor : this.fSerieColor}; font-weight: bold">{point.y}${this.unit ? ` ${this.unit}` : ''}</span>`,
                    },
                    stickyTracking: false
                }
            },
            series: [{
                data: [{
                    color: this.fSerieColor,
                    radius: '112%',
                    innerRadius: '88%',
                    y: this.value
                }]
            }]
        };
    }

}
