import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IOutputData } from 'angular-split/lib/interface';
import { ThyLayoutHorizontalDragEndEvent } from '../models/thy-layout-horizontal-event.class';

const SplitterOpenedSize = 55;
const SplitterClosedSize = 0;
const SplitterFullSize = 100;

@Component({
  selector: 'thy-layout-horizontal',
  templateUrl: './thy-layout-horizontal.component.html',
  styleUrls: ['./thy-layout-horizontal.component.scss']
})
export class ThyLayoutHorizontalComponent {

  @Input() set position(value: 'open' | 'close') {
    value === 'open' ? this.open(SplitterOpenedSize) : this.open(SplitterClosedSize);
  }

  @Output() dragEnd = new EventEmitter<ThyLayoutHorizontalDragEndEvent>();

  public get up() { return 100 - this.down; }
  public down = SplitterOpenedSize;

  public get isOpen() { return this.down !== SplitterClosedSize; }
  public get isFullscreen() { return this.down === SplitterFullSize; }

  public open(percents = SplitterOpenedSize) {
    this.down = percents;
  }

  public close() {
    this.open(SplitterClosedSize);
  }

  public onFullscreen() {
    if (this.isFullscreen) {
      this.open(SplitterOpenedSize);
    } else {
      this.open(SplitterFullSize);
    }
  }

  public onClose() {
    this.close();
  }

  public onDragEnd(event: IOutputData) {
    const thyEvent = new ThyLayoutHorizontalDragEndEvent(<number>event.sizes[0], <number>event.sizes[1]);
    this.open(thyEvent.sizes.down);
    this.dragEnd.emit(thyEvent);
  }

}
