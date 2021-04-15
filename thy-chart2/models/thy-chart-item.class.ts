import { ThyBarType, ThyChartDataType, ThyGraphType } from './thy-chart-type.enum.class';
import { ThyPeriodUnit } from '../../thy-period/models/thy-period-unit.enum';

export interface ThyChartSerieParams {
    Id?: number;
    Name?: string;
    Color?: string;
    AxisY?: number;
    AxisX?: number;
    Display?: number;
    GraphType?: ThyGraphType;
    DataType?: ThyChartDataType;
    GraphStep?: 'left' | 'center' | 'right';
    Label?: string;
    Unit?: string;
    Values?: { i?: number, d: string, v: number }[];
}

// export interface ThyChartSerieCategoryModel extends ThyChartSerieModel {
//     Values?: number[];
// }

export class ThyChartSerie {

    public Id: number;
    public Name: string;
    public Color: string;
    public AxisY: number;
    public AxisX: number;
    public Display: number;
    public Opacity: number;
    public GraphType: ThyGraphType;
    public BarType: ThyBarType;
    public DataType: ThyChartDataType;
    public GraphStep: 'left' | 'center' | 'right';
    public Label: string;
    public Unit: string;
    public Offset: number;
    public OffsetUnit: ThyPeriodUnit;
    public RawValues: { i?: number, d: string, v: number }[];
    public Values: { i?: number, d: any, v: number }[];

    constructor(model?: ThyChartSerieParams) {
        if (model) {
            this.Id = model.Id;
            this.Name = model.Name;
            this.GraphType = model.GraphType;
            this.DataType = model.DataType;
            this.Color = model.Color;
            this.AxisY = model.AxisY;
            this.AxisX = model.AxisX;
            this.Display = model.Display;
            this.Label = model.Label;
            this.Values = model.Values;
        }
    }

}

export class ThyChartSerieCatergory {

    public Name: string;
    public Color: string;
    public AxisY: number;
    public AxisX: number;
    public Display: number;
    public GraphType: ThyGraphType;
    public GraphStep: 'left' | 'center' | 'right';
    public Label: string;
    public Unit: string;
    public Values: number[];

    constructor(model?: any) {
        if (model) {
            this.Name = model.Name;
            this.GraphType = model.GraphType;
            this.Color = model.Color;
            this.AxisY = model.AxisY;
            this.AxisX = model.AxisX;
            this.Display = model.Display;
            this.Label = model.Label;
            this.Values = model.Values;
        }
    }

}

