import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ThyFormatService } from './thy-format.service';

@Pipe({
  name: 'thyFormatColor'
})
export class ThyFormatColorPipe implements PipeTransform {

  constructor(@Inject(ThyFormatService) private formatService: ThyFormatService) { }

  transform(color: string, to: 'hex' | 'rgba' = 'hex'): string {
    return to === 'hex' ? this.formatService.formatColorToHex(color) : this.formatService.formatColorToRgba(color);
  }

}
