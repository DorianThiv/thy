import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-thy-fieldset',
  templateUrl: './thy-fieldset.component.html',
  styleUrls: ['./thy-fieldset.component.scss']
})
export class ThyFieldsetComponent {

  @Input() label: string;

  @Input() labelDetails: string;

  @Input() class = 'ui-g-12';

  @Input() style: object;

  @Input() action: string;

  @Input() actionMenu: string;

  @Output() clickAction = new EventEmitter();

  public get classes(): string[] {
    const classes = this.class ? this.class.split(' ') : [];
    return [].concat(classes, ['thy-fieldset']);
  }

  constructor() { }

  public onClickAction() {
    this.clickAction.emit();
  }

}
