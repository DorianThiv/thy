import { Injectable } from '@angular/core';
import { format } from 'highcharts';
import { ThyFormatService } from '../../thy-format/thy-format.service';
import { ThyNetworkService } from '../../thy-network/thy-network.service';
import { ThyPeriodModel } from '../../thy-period/models/thy-period-model.class';
import { ThyPeriodUnit } from '../../thy-period/models/thy-period-unit.enum';
import { ThyChartAxisY } from '../models/thy-chart-axis-y.class';
import { ThyChartSerie } from '../models/thy-chart-item.class';
import { ThyHeatmapOptions } from '../models/thy-heatmap-options.class';

@Injectable({
  providedIn: 'root'
})
export class ThyHeatmapService {

  // constructor(
  //   private translateService: ThyTranslateService,
  //   private formatService: ThyFormatService,
  //   private converterService: ThyConverterService)
  //   { }

  // public async getEntityConsumptions(id: number, type: ThyObjectType, period: ThyPeriodModel, natureId: number) {
  //   // const startDate = this.formatService.formatDateToMicrosoft(period.StartDate);
  //   // const endDate = this.formatService.formatDateToMicrosoft(period.EndDate);
  //   // const request = new ThyRestGetConsumptionHistoryRequest(this.loginService.session, startDate, endDate, period.Duration, period.SampleDuration, true, true);
  //   // request.Id = id;
  //   // request.EntityType = ThyObjectType.Location;
  //   // request.NatureId = natureId;
  //   // const response = await this.restService.getConsumptionHistoryEx2(request);
  //   // return response;
  // }

  // public async getOptions(): Promise<ThyHeatmapOptions> {
  //   // const keys = new Map<string, string>();
  //   // keys.set('key', 'heatmap');
  //   // const model = new ThyRestGetRequest(this.loginService.session, 'options', keys);
  //   // const response = await this.restService.get(model);
  //   // return response ? new ThyHeatmapOptions({ min: response._min, max: response._max, colorMin: response._colorMin, colorMax: response._colorMax}) : null;
  // }

  // public async setOptions(options: ThyHeatmapOptions) {
  //   // const keys = new Map<string, string>();
  //   // keys.set('key', 'heatmap');
  //   // const model = new ThyRestPutRequest<string>(this.loginService.session, 'options', this.converterService.jsObjectToString(options), keys);
  //   // await this.restService.put<string>(model);
  // }
  // /**
  //  * createSeries
  //  */
  // public createSeries(series: ThyChartSerie[]) {
    
  // }

  // /**
  //  * createSeries
  //  */
  // public createXAxis(categories: string[]) {
  //   const item = ({} as any);
  //   item.categories = categories;
  //   return item;
  // }

  // /**
  //  * createSeries
  //  */
  // public createYAxis(axis: ThyChartAxisY) {
  //   const item = ({} as any);
  //   item.title = {
  //     text: null
  //   },
  //   item.labels = {
  //       format: `{value:${this.getDatePatternFormatYAxis(axis.Period)}}`
  //   },
  //   item.minPadding = 0;
  //   item.maxPadding = 0;
  //   // item.startOnTick = true;
  //   // item.endOnTick = true;
  //   // item.tickPositions = [0, 6, 12, 18, 24];
  //   // item.tickWidth = 1;
  //   // item.min = 0;
  //   // item.max = 7;
  //   item.reversed = true;
  //   return item;
  // }

  // private getDatePatternFormatYAxis(period: ThyPeriodModel) {
  //   switch (period.Duration.Unit) {
  //     case ThyPeriodUnit.Day:
  //       return this.translateService.lang === ThyLangIdentifiers.French ? '%d/%m/%Y' : '%m/%d/%Y';
  //     case ThyPeriodUnit.Month:
  //       return '%B';
  //   }
  // }
}
