import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'thy-toolbar',
  templateUrl: './thy-toolbar.component.html',
  styleUrls: ['./thy-toolbar.component.scss']
})
export class ThyToolbarComponent {

  @ViewChild('toolbar', { static: false }) toolbar: MatToolbar;

  @Input() title: string;
  @Input() elevation = 0;
  @Input() style = {};
  @Input() class = '';

  @Input() showToggler = false;

  @Output() clickToggle = new EventEmitter<never>();

  public get toolbarMaterial(): MatToolbar { return this.toolbar; }
  public get toolbarElementRef(): HTMLElement { return this.toolbar ? this.toolbar._elementRef.nativeElement : null; }

  public get classes() {
    const classes = this.class ? this.class.split(' ') : [];
    return [].concat('thy-toolbar', classes);
  }
  // public get classes() { return `thy-toolbar mat-elevation-z${this.elevation}`; }

  constructor() { }

}
