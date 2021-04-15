import { NgModule } from '@angular/core';
import { ThyFormatPipe } from './thy-format.pipe';
import { ThyFormatColorPipe } from './thy-format-color.pipe';

@NgModule({
  imports: [],
  declarations: [ThyFormatPipe, ThyFormatColorPipe],
  exports: [ThyFormatPipe, ThyFormatColorPipe]
})
export class ThyFormatModule { }
