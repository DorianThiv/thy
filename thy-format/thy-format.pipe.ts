import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ThyPeriodUnit } from '../thy-period/models/thy-period-unit.enum';
import { ThyFormatService } from './thy-format.service';

@Pipe({
  name: 'thyDate',
  pure: false
})
export class ThyFormatPipe implements PipeTransform {

  constructor(@Inject(ThyFormatService) private formatService: ThyFormatService) { }

  transform(value: Date, unit: 'd' | 'h'): unknown {
    switch (unit) {
      case 'd':
        return this.formatService.formatDate(value, ThyPeriodUnit.Day);
      case 'h':
        return this.formatService.formatDate(value, ThyPeriodUnit.Hour);
      default:
        return this.formatService.formatDate(value, ThyPeriodUnit.Day);
    }
  }

}
