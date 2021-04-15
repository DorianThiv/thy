export class ThyHeatmapOptions {

    private _min: number;
    public get min(): number { return this._min ? this._min : 0; }
    public set min(value: number) { this._min = value; }

    private _max: number;
    public get max(): number { return this._max ? this._max : undefined; }
    public set max(value: number) { this._max = value; }

    private _colorMin: string;
    public get colorMin(): string { return this._colorMin ? this._colorMin : '#ffffff'};
    public set colorMin(value: string) { this._colorMin = value; }

    private _colorMax: string;
    public get colorMax(): string { return this._colorMax ? this._colorMax : '#c4463a'};
    public set colorMax(value: string) { this._colorMax = value; }

    constructor(options?: any) {
        if (options) {
            this._min = options.min;
            this._max = options.max;
            this._colorMin = options.colorMin;
            this._colorMax = options.colorMax;
        }
    }

}