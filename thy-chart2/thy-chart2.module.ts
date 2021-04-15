import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyChart2Component } from './thy-chart2.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThyGaugeComponent } from './thy-gauge/thy-gauge.component';
import { ThyGraphComponent } from './thy-graph/thy-graph.component';
import { ThyPieComponent } from './thy-pie/thy-pie.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ThyTranslateModule } from '../thy-translate/thy-translate.module';
import { ThyHeatmapComponent } from './thy-heatmap/thy-heatmap.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HighchartsChartModule,
    ThyTranslateModule
  ],
  declarations: [
    ThyChart2Component,
    ThyGaugeComponent,
    ThyGraphComponent,
    ThyPieComponent,
    ThyHeatmapComponent
  ],
  exports: [
    ThyChart2Component,
    ThyGaugeComponent,
    ThyGraphComponent,
    ThyPieComponent,
    ThyHeatmapComponent
  ]
})
export class ThyChart2Module { }
