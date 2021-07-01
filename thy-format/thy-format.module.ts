import { NgModule } from '@angular/core';
import { ThyFormatPipe } from './thy-format.pipe';
import { ThyFormatColorPipe } from './thy-format-color.pipe';
import { ThyFormatLinkifyPipe } from './thy-format-linkify.pipe';

@NgModule({
  imports: [],
  declarations: [ThyFormatPipe, ThyFormatColorPipe, ThyFormatLinkifyPipe],
  exports: [ThyFormatPipe, ThyFormatColorPipe, ThyFormatLinkifyPipe]
})
export class ThyFormatModule { }
