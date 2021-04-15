import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ThyListCustomComponent } from '../thy-list-custom/thy-list-custom.component';
import { ThyListViewModel } from '../models/thy-list-view.class';

@Component({
  selector: 'app-thy-list-virtual',
  templateUrl: './thy-list-virtual.component.html',
  styleUrls: ['./thy-list-virtual.component.scss']
})
export class ThyListVirtualComponent extends ThyListCustomComponent {

  @Input() itemSize = 50;
  @Input() styleViewport: object;

  constructor() {
    super();
  }

}
