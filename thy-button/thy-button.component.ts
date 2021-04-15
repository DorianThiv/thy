import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thy-button',
  templateUrl: './thy-button.component.html',
  styleUrls: ['./thy-button.component.scss']
})
export class ThyButtonComponent {

  @Input() class = 'ui-g-12';

  @Input() type: 'flat' | 'raised' | 'stroked' | 'icon' = 'raised';

  @Input() icon: string;

  @Input() value: string;

  @Output() click = new EventEmitter<MouseEvent>();

  public get classes(): string[] {
    const classes = this.class ? this.class.split(' ') : [];
    return ['thy-form-button-container'].concat(classes);
  }

  constructor() {
  }

  public onClick(event: MouseEvent) {
    this.click.emit(event);
  }

}
