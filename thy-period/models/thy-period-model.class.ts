import { ThyPeriodUnit } from './thy-period-unit.enum';

export class ThyPeriodDuration {

    public Value: number;
    public Unit: ThyPeriodUnit;

    constructor(unit: ThyPeriodUnit, value = 0) {
        this.Value = value;
        this.Unit = unit;
    }

    public clone() {
        return new ThyPeriodDuration(this.Unit, this.Value);
    }

    public update(duration: ThyPeriodDuration) {
        if (duration) {
            this.Value = duration.Value;
            this.Unit = duration.Unit;
        }
    }
}

export class ThyPeriodModel {

    public Start: number;
    public StartDate: Date;
    public EndDate: Date;
    public Offset: ThyPeriodDuration;
    public Offset2: ThyPeriodDuration;
    public Duration: ThyPeriodDuration;
    public SampleDuration: ThyPeriodDuration;
    public IsEquivalentPeriod;
    public IsEquivalentWeekDay;
    public Compact: string;

    public StartDateStr: string;
    public EndDateStr: string;

    constructor(
        startDate?: Date,
        endDate?: Date,
        duration?: ThyPeriodDuration,
        sample?: ThyPeriodDuration,
        offset?: ThyPeriodDuration,
        start?: number,
        offset2?: ThyPeriodDuration,
        isEquivalentPeriod?: boolean,
        isEquivalentWeekDay?: boolean) {
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.Start = start;
            this.Duration = duration ? duration : new ThyPeriodDuration(ThyPeriodUnit.None);
            this.SampleDuration = sample ? sample : new ThyPeriodDuration(ThyPeriodUnit.None, 1);
            this.Offset = offset ? offset : new ThyPeriodDuration(ThyPeriodUnit.None, 0);
            this.Offset2 = offset2 ? offset2 : new ThyPeriodDuration(ThyPeriodUnit.None, 0);
            this.IsEquivalentPeriod = isEquivalentPeriod;
            this.IsEquivalentWeekDay = isEquivalentWeekDay;
    }

    public clone(): ThyPeriodModel {
        const period = new ThyPeriodModel();
        period.Start = this.Start
        period.StartDate = new Date(this.StartDate);
        period.EndDate = new Date(this.EndDate);
        period.Compact = this.Compact
        period.Offset = this.Offset.clone();
        period.Offset2 = this.Offset2.clone();
        period.Duration = this.Duration.clone();
        period.SampleDuration = this.SampleDuration.clone();
        period.IsEquivalentPeriod = this.IsEquivalentPeriod
        period.IsEquivalentWeekDay = this.IsEquivalentWeekDay
        return period;
    }

    public update(period: ThyPeriodModel): void {
        if (period) {
            this.Start = period.Start;
            this.StartDate = new Date(period.StartDate);
            this.EndDate = new Date(period.EndDate);
            this.Compact = period.Compact;
            this.Offset.update(period.Offset);
            this.Offset2.update(period.Offset2);
            this.Duration.update(period.Duration);
            this.SampleDuration.update(period.SampleDuration);
            this.IsEquivalentPeriod = period.IsEquivalentPeriod;
            this.IsEquivalentWeekDay = period.IsEquivalentWeekDay;
        }
    }
}
