import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThyDialogsService } from '../../thy-dialogs/thy-dialogs.service';
import { ThyPeriodModel } from '../models/thy-period-model.class';
import { ThyPeriodService } from '../thy-period.service';

export interface ThyPeriodChangeEvent {
  mode: ThyPeriodMode;
  period: ThyPeriodModel | string;
}

enum ThyPeriodMode {
  Default,
  Other
}
@Component({
  selector: 'app-thy-period-selection',
  templateUrl: './thy-period-selection.component.html',
  styleUrls: ['./thy-period-selection.component.scss']
})
export class ThyPeriodSelectionComponent {

  private emitType: 'period' | 'compact' = 'period';

  @Input() model: ThyPeriodModel;
  @Input() set compactPeriod(value: string) {
    this.emitType = 'compact';
    this.period = this.periodService.decodeCompactStringToPeriod(value);
  }

  @Input() value: ThyPeriodMode = ThyPeriodMode.Default;
  @Output() valueChange = new EventEmitter<ThyPeriodChangeEvent>();

  public periodModes = ThyPeriodMode;

  private period: ThyPeriodModel;

  constructor(private dialogsService: ThyDialogsService, private periodService: ThyPeriodService) {
    this.period = this.periodService.defaultPeriod;
  }

  public onModeChange() {
    this.valueChange.emit({ mode: this.value, period: this.value === ThyPeriodMode.Default ? null : this.period });
  }

  public onBuildPeriod() {
    const period = this.compactPeriod ? this.periodService.decodeCompactStringToPeriod(this.compactPeriod) : this.period ? this.period : null;
    this.dialogsService.period({ period: period }).subscribe((newPeriod: ThyPeriodModel) => {
      if (newPeriod) {
        this.period = newPeriod;
        this.valueChange.emit({ mode: this.value, period: this.emitType === 'period' ? this.period : this.periodService.encodeToCompactString(this.period) });
      }
    });
  }

}
