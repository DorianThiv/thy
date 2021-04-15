import { EventEmitter, Injectable } from '@angular/core';
import { dictionary } from './translations';
import { IntlService } from '@progress/kendo-angular-intl';
import { ThyLangIdentifiers } from './models/thy-translate.enum';
import { ThyPeriodUnit } from '../thy-period/models/thy-period-unit.enum';

@Injectable({
  providedIn: 'root'
})
export class ThyTranslateService {

    private _identifier: string;
    private _default: any;

    public supportedLangs =
    [
        {
            display: 'English',
            value: ThyLangIdentifiers.English,
            flag: 'flag-usa',
            fullPattern: 'D',
            longPattern: 'MMMM dd y',
            longPatternHours: 'MM/dd/y HH:mm:ss',
            shortPattern: 'MM/dd/y',
            monthPattern: 'MM/y',
            durationPattern: 'HH:mm:ss',
            separator: '/'
        },
        {
            display: 'French',
            value: ThyLangIdentifiers.French,
            flag: 'flag-france',
            fullPattern: 'D',
            longPattern: 'dd MMMM y',
            longPatternHours: 'dd/MM/y HH:mm:ss',
            shortPattern: 'dd/MM/y',
            monthPattern: 'MM/y',
            durationPattern: 'HH:mm:ss',
            separator: '/'
        },
        {
            display: 'German',
            value: ThyLangIdentifiers.German,
            flag: 'flag-germany',
            fullPattern: 'D',
            longPattern: 'dd MMM y',
            longPatternHours: 'MM/dd/y HH:mm:ss',
            shortPattern: 'dd/MM/y',
            monthPattern: 'MM/y',
            durationPattern: 'HH:mm:ss',
            separator: '/'
        },
        {
            display: 'Sweden',
            value: ThyLangIdentifiers.Swedish,
            flag: 'flag-sweden',
            fullPattern: 'D',
            longPattern: 'dd MMM y',
            longPatternHours: 'MM/dd/y HH:mm:ss',
            shortPattern: 'dd/MM/y',
            monthPattern: 'MM/y',
            durationPattern: 'HH:mm:ss',
            separator: '/'
        },
        {
            display: 'Norway',
            value: ThyLangIdentifiers.Norwegian,
            flag: 'flag-norway',
            fullPattern: 'D',
            longPattern: 'dd MMM y',
            longPatternHours: 'MM/dd/y HH:mm:ss',
            shortPattern: 'dd/MM/y',
            monthPattern: 'MM/y',
            durationPattern: 'HH:mm:ss',
            separator: '/'
        },
        {
            display: 'Netherlands',
            value: ThyLangIdentifiers.Dutch,
            flag: 'flag-netherlands',
            fullPattern: 'D',
            longPattern: 'dd MMM y',
            longPatternHours: 'MM/dd/y HH:mm:ss',
            shortPattern: 'dd/MM/y',
            monthPattern: 'MM/y',
            durationPattern: 'HH:mm:ss',
            separator: '/'
        },
    ];

    public get identifier(): string { return this._identifier; }

    public get lang(): string { return this._identifier; }

    public get shortDays(): string[] {
        return [
            this.instant('@global-sunday_abrv'),
            this.instant('@global-monday_abrv'),
            this.instant('@global-tuesday_abrv'),
            this.instant('@global-wednesday_abrv'),
            this.instant('@global-thursday_abrv'),
            this.instant('@global-friday_abrv'),
            this.instant('@global-saturday_abrv'),
        ];
    }

    public get shortMonth(): string[] { return [
        this.instant('@global-january_abrv'),
        this.instant('@global-february_abrv'),
        this.instant('@global-march_abrv'),
        this.instant('@global-april_abrv'),
        this.instant('@global-may_abrv'),
        this.instant('@global-june_abrv'),
        this.instant('@global-july_abrv'),
        this.instant('@global-august_abrv'),
        this.instant('@global-september_abrv'),
        this.instant('@global-october_abrv'),
        this.instant('@global-november_abrv'),
        this.instant('@global-december_abrv'),
    ];
    }

    public get days(): string[] { return [
        this.instant('@global-sunday'),
        this.instant('@global-monday'),
        this.instant('@global-tuesday'),
        this.instant('@global-wednesday'),
        this.instant('@global-thursday'),
        this.instant('@global-friday'),
        this.instant('@global-saturday'),
    ];
    }

    public get months(): string[] { return [
            this.instant('@global-january'),
            this.instant('@global-february'),
            this.instant('@global-march'),
            this.instant('@global-april'),
            this.instant('@global-may'),
            this.instant('@global-june'),
            this.instant('@global-july'),
            this.instant('@global-august'),
            this.instant('@global-september'),
            this.instant('@global-october'),
            this.instant('@global-november'),
            this.instant('@global-december')
        ];
    }

    public langChanged = new EventEmitter();

    constructor(private intl: IntlService) {
        this._default = this.supportedLangs[0];
    }

    public initialize(lang: string) {
        // const cookieLang = this.cookiesService.get('ck_lang');
        // lang = cookieLang ? cookieLang : this.navigatorLang(lang);
        lang = this.navigatorLang(lang);
        if (lang && this.supportedLangs.find(lg => lg.value === lang)) {
            this.use(lang);
        } else {
            this.use(this._default.value);
        }
    }

    public use(lang: string): void {
        this._identifier = lang;
        // this.cookiesService.set('ck_lang', lang);
        this.langChanged.emit();
    }

    public instant(key: string) {
        return this.translate(key);
    }

    private translate(key: string): string {
        const translation = key;
        if (dictionary[this._identifier] && dictionary[this._identifier][key]) {
            return dictionary[this._identifier][key];
        }
        return translation;
    }

    public getCurrentLang() {
        if (this._identifier && this._identifier === 'no') { return this._default.value; }
        return this._identifier;
    }

    public getCurrentLangFlagName() {
        const lang = this.getSupportedLangs().find(l => this._identifier === l.value);
        return lang ? lang.flag : this._default.flag;
    }

    public getCurrentFullPattern() {
        const lang = this.getSupportedLangs().find(l => this._identifier === l.value);
        return lang ? lang.fullPattern : this._default.fullPattern;
    }

    public getCurrentLongPattern() {
        const lang = this.getSupportedLangs().find(l => this._identifier === l.value);
        return lang ? lang.longPattern : this._default.longPattern;
    }

    public getCurrentLongPatternHours() {
        const lang = this.getSupportedLangs().find(l => this._identifier === l.value);
        return lang ? lang.longPatternHours : this._default.longPatternHours;
    }

    public getCurrentShortPattern() {
        const lang = this.getSupportedLangs().find(l => this._identifier === l.value);
        return lang ? lang.shortPattern : this._default.shortPattern;
    }

    public getCurrentMonthPattern() {
        const lang = this.getSupportedLangs().find(l => this._identifier === l.value);
        return lang ? lang.monthPattern : this._default.monthPattern;
    }

    public getCurrentDurationPattern() {
        const lang = this.getSupportedLangs().find(l => this._identifier === l.value);
        return lang ? lang.durationPattern : this._default.durationPattern;
    }

    public getSupportedLangs() {
        return this.supportedLangs;
    }

    private navigatorLang(lang: string) {
        if (lang) {
            return lang.includes('-') ? lang.split('-')[0] : lang;
        } else {
            return this._default.value;
        }
    }

    // Resolve

    public resolveDayOfWeek(index: number) {
        if (index >= 0) {
            const dayOffset = index % 7;
            switch (dayOffset) {
                case 0:
                    return this.instant('@global-monday_abrv');
                case 1:
                    return this.instant('@global-tuesday_abrv');
                case 2:
                    return this.instant('@global-wednesday_abrv');
                case 3:
                    return this.instant('@global-thursday_abrv');
                case 4:
                    return this.instant('@global-friday_abrv');
                case 5:
                    return this.instant('@global-saturday_abrv');
                case 6:
                    return this.instant('@global-sunday_abrv');
            }
        }
    }

    public resolveDayOfWeek2(index: number) {
        if (index >= 0) {
            const dayOffset = index % 7;
            switch (dayOffset) {
                case 0:
                    return this.instant('@global-sunday_abrv');
                case 1:
                    return this.instant('@global-monday_abrv');
                case 2:
                    return this.instant('@global-tuesday_abrv');
                case 3:
                    return this.instant('@global-wednesday_abrv');
                case 4:
                    return this.instant('@global-thursday_abrv');
                case 5:
                    return this.instant('@global-friday_abrv');
                case 6:
                    return this.instant('@global-saturday_abrv');
            }
        }
    }

    public resolveMonth(month: number) {
        return this.instant(this.months[month]);
    }

    // Format

    public convertDateToString(date: Date, unit: ThyPeriodUnit) {
        switch (unit) {
            case ThyPeriodUnit.Hour:
                return this.intl.formatDate(date, this.getCurrentLongPatternHours(), this.getCurrentLang());
            case ThyPeriodUnit.Day:
                return this.intl.formatDate(date, this.getCurrentLongPattern(), this.getCurrentLang());
            case ThyPeriodUnit.Month:
                return this.intl.formatDate(date, this.getCurrentMonthPattern(), this.getCurrentLang());
            case ThyPeriodUnit.Year:
                return this.intl.formatDate(date, this.getCurrentShortPattern(), this.getCurrentLang());
            default:
                return this.intl.formatDate(date, this.getCurrentShortPattern(), this.getCurrentLang());
        }
    }

    public getDatePer(date: Date, level: 'day' | 'month' | 'year') {
        switch (level) {
        case 'day':
            return this.intl.formatDate(date, this.getCurrentShortPattern(), this.getCurrentLang());
        case 'month':
            return this.intl.formatDate(date, this.getCurrentMonthPattern(), this.getCurrentLang());
        case 'year':
            return this.intl.formatDate(date, this.getCurrentShortPattern(), this.getCurrentLang());
        default:
            return this.intl.formatDate(date, this.getCurrentShortPattern(), this.getCurrentLang());
        }
    }

    public getFullDate(date: Date | string) {
        if (date) {
        try {
            if (typeof(date) === 'string') {
                date = new Date(parseInt(date.substr(6), 10));
            }
            return this.intl.formatDate(date, this.getCurrentFullPattern(), this.getCurrentLang());
        } catch (error) {
            console.log(error);
        }
        }
    }

    public formatDate(date: Date | string, short: boolean = false) {
        if (date) {
            try {
                if (typeof(date) === 'string') {
                    date = new Date(parseInt(date.substr(6), 10));
                }
                return this.intl.formatDate(date, short ? this.getCurrentShortPattern() : this.getCurrentLongPatternHours(), this.getCurrentLang());
            } catch (error) {
                console.log(error);
            }
        }
    }

    /**
     * @todo Remove possibilty to parse a string date inside this method.
     * Check all references to be sure about this change.
     * @param {Date} date Must be only `typeof Date`.
     * @param {ThyPeriodUnit} unit `ThyPeriodUnit`
     */
    public formatDate2(date: Date | string, unit: ThyPeriodUnit) {
        if (date) {
            try {
                if (typeof(date) === 'string') {
                    date = new Date(parseInt(date.substr(6), 10));
                }
                switch (unit) {
                    case ThyPeriodUnit.Hour:
                        return this.intl.formatDate(date, this.getCurrentLongPatternHours(), this.getCurrentLang());
                    case ThyPeriodUnit.Day:
                        return this.intl.formatDate(date, this.getCurrentShortPattern(), this.getCurrentLang());
                    case ThyPeriodUnit.Month:
                    case ThyPeriodUnit.Year:
                        return this.intl.formatDate(date, this.getCurrentMonthPattern(), this.getCurrentLang());
                    default:
                        return this.intl.formatDate(date, this.getCurrentShortPattern(), this.getCurrentLang());
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    public formatDuration(days: number, hours: number, minutes: number, secondes: number): string {
        return `${days} ${this.instant(days === 1 ? '@global-day' : '@global-days')} ${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
    }

    public formatDurationConditional(days: number, hours: number, minutes: number, secondes: number): string {
        if (days) {
            return `${days} ${this.instant(days === 1 ? '@global-day' : '@global-days')} ${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
        } else if (hours) {
            return `${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
        } else if (minutes) {
            return `00:${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
        } else if (secondes) {
            return `${secondes} s`;
        } else {
            return isNaN(minutes) || isNaN(secondes) ? '0' : `${this.formatDigit(minutes)}:${this.formatDigit(secondes)}`;
        }
    }

    private formatDigit(digit: number) {
        if (isNaN(digit)) { return ''; }
        return digit > 9 ? '' + digit : '0' + digit;
    }

}
