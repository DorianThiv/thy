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

  private SplitterOpenedSize = 20;
  private SplitterClosedSize = 0;
  private SplitterFullSize = 100;

  @Input() set position(value: 'open' | 'close') {
    value === 'open' ? this.open(SplitterOpenedSize) : this.open(SplitterClosedSize);
  }

  @Input() set size(value: number) {
    this.SplitterOpenedSize = value;
    this.open(value);
  }

  @Output() dragEnd = new EventEmitter<ThyLayoutHorizontalDragEndEvent>();

  public get up() { return 100 - this.down; }
  public down = this.SplitterOpenedSize;

  public get isOpen() { return this.down !== this.SplitterClosedSize; }
  public get isFullscreen() { return this.down === this.SplitterFullSize; }

  public open(percents = this.SplitterOpenedSize) {
    this.down = percents;
  }

  public close() {
    this.open(this.SplitterClosedSize);
  }

  public onFullscreen() {
    if (this.isFullscreen) {
      this.open(this.SplitterOpenedSize);
    } else {
      this.open(this.SplitterFullSize);
    }
  }

  public onClose() {
    this.close();
  }

  public onDragEnd(event: IOutputData) {
    // const thyEvent = new ThyLayoutHorizontalDragEndEvent(<number>event.sizes[0], <number>event.sizes[1]);
    // this.open(thyEvent.sizes.down);
    this.dragEnd.emit();
  }

}
