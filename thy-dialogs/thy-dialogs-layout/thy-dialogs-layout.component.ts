import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-thy-dialogs-layout',
  templateUrl: './thy-dialogs-layout.component.html',
  styleUrls: ['./thy-dialogs-layout.component.scss']
})
export class ThyDialogsLayoutComponent {

  /**
   * Dialog title.
   */
  @Input() title: string;

  /**
   * Dialog title.
   */
  @Input() subtitle: string;

  /**
   * Boolean to determinate if it's a validation dialog or
   * a simple dialog to display data.
   */
  @Input() validation = true;

  /**
   * Boolean to disabled `Ok` button if the form requirment are not valid.
   */
  @Input() invalid = false;

  /**
   * Boolean loading to disabled `Ok` button during a process in dialog.
   */
  @Input() loading = false;

  /**
   * Boolean longLoading if loading during more than 3s show spinner.
   */
  @Input() longLoading = false;

  @Input() showHeader = true;

  @Input() showCloseButton = true;

  @Input() validLabel = 'Ok';

  @Input() labelClose = '@global-cancel';

  @Input() actionIcon: string;
  public get action(): boolean { return this.actionIcon ? true : false; }

  @Input() showBottomAction = false;

  /**
   * Triggered when user click on `Ok` button.
   */
  @Output() validate = new EventEmitter();

  /**
   * Triggered when user click on a `Close` button.
   */
  @Output() close = new EventEmitter();

  /**
   * Triggered when user click on the action button.
   */
  @Output() clickAction = new EventEmitter();

}
