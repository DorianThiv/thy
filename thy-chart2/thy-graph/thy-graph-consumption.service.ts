import { Injectable } from '@angular/core';
import { ThyLoginService } from '../../../../thy-core/thy-login/thy-login.service';
import { ThyFormatService } from '../../../thy-services/thy-format/thy-format.service';
import { ThyObjectType } from '../../../thy-services/thy-objects/thy-types.class';
import { ThyRest2Service } from '../../../thy-services/thy-rest/thy-rest2.service';
import { ThyRestGetConsumptionHistoryRequest, ThyRestGetConsumptionOptions } from '../../../thy-services/thy-rest/models/thy-rest-requests.class';
import { ThyPeriodService } from '../../thy-period/thy-period.service';
import { ThyPeriodModel } from '../../thy-period/models/thy-period-model.class';
import { ThyPeriodUnit } from '../../thy-period/models/thy-period-unit.enum';
import { ThyChartSerie } from '../models/thy-chart-item.class';
import { ThyChartDataType, ThyGraphType } from '../models/thy-chart-type.enum.class';

@Injectable({
  providedIn: 'root'
})
export class ThyGraphConsumptionService {

  constructor(private loginService: ThyLoginService, private restService: ThyRest2Service, private formatService: ThyFormatService, private periodService: ThyPeriodService) { }

  public async getConsumptions(id: number, type: ThyObjectType, natureId: number, period: ThyPeriodModel, options: ThyRestGetConsumptionOptions): Promise<ThyChartSerie[]> {
    const startDate = this.formatService.formatDateToMicrosoft(period.StartDate);
    const endDate = this.formatService.formatDateToMicrosoft(period.EndDate);
    const request = new ThyRestGetConsumptionHistoryRequest(this.loginService.session, startDate, endDate, period.Duration, period.SampleDuration, false, true, options);
    request.Id = id;
    request.EntityType = type;
    request.NatureId = natureId;
    const response = await this.restService.getConsumptionHistoryEx2(request);
    let series = response && response.Data ? response.Data.map(data => {
      const item = new ThyChartSerie();
      item.Id = data.NatureId;
      item.Name = data.Nature;
      item.Label = `${data.Nature}${data.Unit ? ` (${data.Unit})` : '' }`;
      item.Unit = data.Unit;
      item.AxisY = 0;
      item.AxisX = 0;
      item.Color = data.Color;
      item.GraphType = ThyGraphType.Bar;
      item.DataType = ThyChartDataType.Consumption;
      item.RawValues = data.Data;
      item.Values = this.buildValues(data.Data);
      return item;
    }) : [];
    if (options && options.showPreviousYear) {
      const periodLastYear = period.clone();
      this.periodService.shiftByYears(periodLastYear, 1, true);
      const startDate = this.formatService.formatDateToMicrosoft(periodLastYear.StartDate);
      const endDate = this.formatService.formatDateToMicrosoft(periodLastYear.EndDate);
      const request = new ThyRestGetConsumptionHistoryRequest(this.loginService.session, startDate, endDate, periodLastYear.Duration, periodLastYear.SampleDuration, false, true, options);
      request.Id = id;
      request.EntityType = ThyObjectType.Location;
      request.NatureId = natureId;
      const responseLastYear = await this.restService.getConsumptionHistoryEx2(request);
      series = series.concat(responseLastYear && responseLastYear.Data ? responseLastYear.Data.map(data => {
        const item = new ThyChartSerie();
        item.Id = data.NatureId;
        item.Name = `${data.Nature} (${periodLastYear.StartDate.getFullYear()})`;
        item.Label = `${data.Nature} ${periodLastYear.StartDate.getFullYear()}${data.Unit ? ` (${data.Unit})` : '' }`;
        item.Unit = data.Unit;
        item.AxisY = 0;
        item.AxisX = 0;
        item.Color = data.Color;
        item.Opacity = 0.5;
        item.Offset = 1;
        item.OffsetUnit = ThyPeriodUnit.Year;
        item.GraphType = ThyGraphType.Bar;
        item.DataType = ThyChartDataType.Consumption;
        item.RawValues = data.Data;
        const values = [];
        data.Data.forEach(value => {
          const date = new Date(parseInt(value.d.substr(6), 10));
          values.push([this.periodService.shiftDate(date, item.Offset, item.OffsetUnit).getTime(), value.v])
        });
        item.Values = values;
        return item;
      }) : []);
    }
    return series;
  }

  private buildValues(data: { d: string, v: any }[]) {
    const values = [];
    if (data) {
      data.map(value => values.push([parseInt(value.d.substr(6), 10), value.v]));
    }
    return values;
  }

}
