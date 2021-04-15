import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IOutputData } from 'angular-split/lib/interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ThyPlatformService } from '../../thy-platform/thy-platform.service';

@Component({
  selector: 'thy-layout-vertical',
  templateUrl: './thy-layout-vertical.component.html',
  styleUrls: ['./thy-layout-vertical.component.scss']
})
export class ThyLayoutVerticalComponent {

  private SplitterOpenedSize = 20;
  private SplitterClosedSize = 0;

  @Input() set position(value: 'open' | 'close') {
    value === 'open' ? this.open(this.SplitterOpenedSize) : this.open(this.SplitterClosedSize);
  }

  /**
   * Size in percents
   */
  @Input() set size(value: number) {
    this.SplitterOpenedSize = value;
    this.open(value);
  }

  @Input() set leftSize(value: number) {
    this.SplitterOpenedSize = value;
    this.open(this.SplitterOpenedSize);
  }

  @Input() showRight = true;

  @Input() useToolbarHeight = true;

  @Input() useMargin = true;

  @Output() dragEnd = new EventEmitter<any>();

  public isFullscreen = false;

  public left = this.SplitterOpenedSize;
  public get right(): number { return 100 - this.left; }

  public get isOpen() { return this.left !== this.SplitterClosedSize; }

  constructor(private route: ActivatedRoute, private platformService: ThyPlatformService) {
    this.position = this.platformService.isMobile ? 'close' : 'open';
    // this.route.queryParamMap.subscribe((param: ParamMap) => {
    //   const params = new ThyParametersModel(param);
    //   this.position = params.nomenu ? 'close' : 'open';
    //   this.isFullscreen = params.fullscreen;
    //   this.useToolbarHeight = this.isFullscreen ? false : this.useToolbarHeight;
    // });
  }

  public open(percents = this.SplitterOpenedSize) {
    this.left = percents;
  }

  public toggle() {
    this.open(this.isOpen ? this.SplitterClosedSize : this.SplitterOpenedSize);
  }

  public close() {
    this.open(this.SplitterClosedSize);
  }

  public onDragEnd(event: IOutputData) {
    // const thyEvent = new ThyLayoutHorizontalDragEndEvent(<number>event.sizes[0], <number>event.sizes[1]);
    // this.open(thyEvent.sizes.down);
    this.dragEnd.emit();
  }

}
