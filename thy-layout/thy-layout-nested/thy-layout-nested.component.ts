import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThyLayoutHorizontalDragEndEvent } from '../models/thy-layout-horizontal-event.class';
import { IOutputData } from 'angular-split/lib/interface';
import { ActivatedRoute } from '@angular/router';
import { ThyPlatformService } from '../../thy-platform/thy-platform.service';

export const SplitterNestedLeftOpen = 20;
export const SplitterNestedDownOpen = 55;
export const SplitterNestedClose = 0;
export const SplitterNestedFull = 100;

@Component({
  selector: 'app-thy-layout-nested',
  templateUrl: './thy-layout-nested.component.html',
  styleUrls: ['./thy-layout-nested.component.scss']
})
export class ThyLayoutNestedComponent {

  @Input() set leftPosition(value: 'open' | 'close') {
    value === 'open' ? this.openLeft(SplitterNestedLeftOpen) : this.openLeft(SplitterNestedClose);
  }

  @Input() set downPosition(value: 'open' | 'close') {
    value === 'open' ? this.openDown(SplitterNestedDownOpen) : this.openDown(SplitterNestedClose);
  }

  @Output() dragEnd = new EventEmitter<ThyLayoutHorizontalDragEndEvent>();

  public left = SplitterNestedLeftOpen;
  public get right(): number { return 100 - this.left; }
  public get up() { return 100 - this.down; }
  public down = SplitterNestedDownOpen;

  public get isLeftOpen() { return this.left !== SplitterNestedClose; }
  public get isDownOpen() { return this.down !== SplitterNestedClose; }
  public get isDownFullscreen() { return this.down === SplitterNestedFull; }

  constructor(private route: ActivatedRoute, private platformService: ThyPlatformService) {
    this.leftPosition = this.platformService.isMobile ? 'close' : 'open';
    const param = this.route.snapshot.queryParamMap;
    if (param.keys.length > 0) {
      const nomenu = param.get('nomenu');
      this.leftPosition = nomenu && (nomenu.toLowerCase() === 'true' || nomenu.toLowerCase() === '1') ? 'close' : 'open';
    }
  }

  public openLeft(percents = SplitterNestedLeftOpen) {
    this.left = percents;
  }

  public openDown(percents = SplitterNestedDownOpen) {
    this.down = percents;
  }

  public toggleLeft() {
    this.openLeft(this.isLeftOpen ? SplitterNestedClose : SplitterNestedLeftOpen);
  }

  public closeLeft() {
    this.openLeft(SplitterNestedClose);
  }

  public closeDown() {
    this.openDown(SplitterNestedClose);
  }

  public toggle() {
    this.openLeft(this.isLeftOpen ? SplitterNestedClose : SplitterNestedLeftOpen);
  }

  public fullscreenDown() {
    this.openDown(SplitterNestedFull);
  }

  public toggleDown() {
    if (this.isDownFullscreen) {
      this.openDown();
    } else {
      this.openDown(SplitterNestedFull);
    }
  }

  public onDragEnd(event: IOutputData) {
    // const thyEvent = new ThyLayoutNestedDragEndEvent(<number>event.sizes[0], <number>event.sizes[1]);
    // this.open(thyEvent.sizes.down);
    // this.dragEnd.emit(event);
  }

}
