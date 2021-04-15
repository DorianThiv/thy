import { Component, OnInit } from '@angular/core';
import { ThyToolbarComponent } from '../thy-toolbar.component';

@Component({
  selector: 'app-thy-toolbar-mini',
  templateUrl: './thy-toolbar-mini.component.html',
  styleUrls: ['./thy-toolbar-mini.component.scss']
})
export class ThyToolbarMiniComponent extends ThyToolbarComponent {

  public get classes() {
    const classes = this.class ? this.class.split(' ') : [];
    return [].concat('thy-toolbar-mini', classes);
  }

  constructor() {
    super();
  }

}
