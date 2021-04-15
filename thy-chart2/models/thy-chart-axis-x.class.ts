import { ThyPeriodModel } from '../../thy-period/models/thy-period-model.class';

export class ThyChartAxisX {

    public Period: ThyPeriodModel;
    public FontSize: number;
    public Visible: boolean;

    public DisplayWeekends = true;

    constructor(period?: ThyPeriodModel, fontSize?: number, visible = true) {
        this.Period = period;
        this.FontSize = fontSize;
        this.Visible = visible;
    }

}
