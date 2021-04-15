
import { Value } from '../../../../thy-models/thy-value.class';
import { FormatService } from '../../../../thy-services/thy-format/format.service';
import { isNullOrUndefined } from '../../../../thy-services/thy-utils-functions/thy-utils-functions.service';

export class ThyConsumptionGridModel {

    public Name: string;
    public Unit: string;
    public Color: string;
    public Values: Value[];
    public Options: any;

    constructor(name: string, unit: string, color: string, values: Value[], options: any) {
        this.Name = name;
        this.Unit = unit;
        this.Color = color;
        this.Values = values;
        this.Options = options;
    }

    public getValueFromPeriod(period: string) {
        const value = this.Values.find(v => v.date === period);
        if (value) {
            return value.value ? FormatService.numberFormat(value.value) : undefined;
        }
    }

    public getTotalConsumptionOfElement() {
        let res = 0;
        this.Values.forEach(v => {
            if (v && v.value !== null && v.value !== undefined) {
                res += v.value;
            }
        });
        return res ? FormatService.numberFormat(res) : undefined;
    }
}

export class ThyConsumptionGridTotalModel extends ThyConsumptionGridModel {

    constructor(source: ThyConsumptionGridModel[], dates: string[]) {
        const totalValues = [];
        dates.forEach(date => {
            const values = [];
            source.forEach(conso => values.push(conso.Values.find(value => value.date === date)));
            let total = 0;
            values.forEach(val => {
                if (val && val.value) {
                    total += val.value;
                }
            });
            if (total !== undefined && total !== null) {
                totalValues.push(new Value(date, total, 0));
            }
        });
        super('Total', '', 'black', totalValues, null);
    }

}

export class ThyConsumptionGridModel2 {

    public Name: string;
    public Unit: string;
    public Color: string;
    public Values: Value[];
    public Options: any;

    constructor(name: string, unit: string, color: string, values: Value[], options: any) {
        this.Name = name;
        this.Unit = unit;
        this.Color = color;
        this.Values = values;
        this.Options = options;
    }

    public getValueFromPeriod(period: Date) {
        if (!period) { return null; }
        const date = new Date(period);
        const value = this.Values.find(v => v.dateTime.getTime() === date.getTime());
        if (value) {
            return value.value ? FormatService.numberFormat(value.value) : undefined;
        }
    }

    public getTotalConsumptionOfElement() {
        let res = 0;
        this.Values.forEach(v => {
            if (v && !isNullOrUndefined(v.value)) {
                res += v.value;
            }
        });
        return res ? FormatService.numberFormat(res) : undefined;
    }
}

export class ThyConsumptionGridTotalModel2 extends ThyConsumptionGridModel2 {

    constructor(source: ThyConsumptionGridModel2[], dates: string[]) {
        const totalValues = [];
        dates.forEach(date => {
            const values = [];
            source.forEach(conso => values.push(conso.Values.find(value => value.dateTime.toJSON() === date)));
            let total = 0;
            values.forEach(val => {
                if (val && val.value) {
                    total += val.value;
                }
            });
            if (!isNullOrUndefined(total)) {
                totalValues.push(new Value(date, total, 0));
            }
        });
        super('Total', '', 'black', totalValues, null);
    }

}
