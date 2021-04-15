import { ThyPeriodModel } from "../../thy-period/models/thy-period-model.class";

export class ThyChartAxisY {

    public Id: number;
    public Label: string;
    public Max: number;
    public Min: number;
    public FontSize: number;
    public Position: boolean;
    public Period: ThyPeriodModel;
    public Visible = true;

    constructor(label?: string, max?: number, min?: number, position?: boolean, id?: number, period?: ThyPeriodModel) {
        this.Id = id;
        this.Label = label;
        this.Max = max;
        this.Min = min;
        this.Position = position;
    }

}
