import { Pipe, PipeTransform, Inject } from '@angular/core';
import { ThyTranslateService } from './thy-translate.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class ThyTranslatePipe implements PipeTransform {

  constructor(@Inject(ThyTranslateService) private translateService: ThyTranslateService) { }

  transform(value: any, args?: any): any {
    if (!value) { return; }
    return this.translateService.instant(value);
  }

}
