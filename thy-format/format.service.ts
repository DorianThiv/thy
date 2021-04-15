import { Injectable } from '@angular/core';
import { isUndefined } from 'util';

@Injectable()
export class FormatService {

    constructor() { }

    // This function removes non-numeric characters
    private static stripNonNumeric(str) {
        str += '';
        const rgx = /^\d|\.|-$/;
        let out = '';
        for (let i = 0; i < str.length; i++) {
            if (rgx.test(str.charAt(i))) {
                if (!((str.charAt(i) === '.' && out.indexOf('.') !== -1) ||
                (str.charAt(i) === '-' && out.length !== 0))) {
                    out += str.charAt(i);
                }
            }
        }
        return out;
    }

    public static numberFormat (num: any, format?: string) {
        if (num === undefined || num === null) {
            return '';
        }
        if (typeof(num) === 'string') {
            if (num.indexOf(',') !== -1) {
                num = num.replace(',', '.');
            }
            num = Number(num);
        }
        try {
            if (!format) {
                format = num < 10 ? '0.0' : '0';
            }
            // Number format
            format = format.split('#').join('0');
            const hasComma = -1 < format.indexOf(',');
            let psplit = FormatService.stripNonNumeric(format).split('.');
            const that = num;
            let fnum: string;

            // compute precision
            if (1 < psplit.length) {
            // fix number precision
            fnum = that.toFixed(psplit[1].length);
            } else if (2 < psplit.length) {
                throw new Error(('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format));
            } else {
                fnum = that.toFixed(0);
            }

            // format has comma, then compute commas
            if (hasComma) {
                // remove precision for computation
                psplit = fnum.split('.');

                const cnum = psplit[0],
                    parr = [],
                    j = cnum.length;
                    let m = Math.floor(j / 3);
                    let n = cnum.length % 3 || 3; // n cannot be ZERO or causes infinite loop

                // break the number into chunks of 3 digits; first chunk may be less than 3
                for (let i = 0; i < j; i += n) {
                    if (i !== 0) {
                        n = 3;
                    }
                    parr[parr.length] = cnum.substr(i, n);
                    m -= 1;
                }

                // put chunks back together, separated by comma
                fnum = parr.join(',');

                // add the precision back in
                if (psplit[1]) {
                    fnum += '.' + psplit[1];
                }
            }

        // replace the number portion of the format with fnum
            return format.replace(/[\d,?\.?]+/, fnum);
        } catch (error) {
        }
        return '';
    }

    public static formatHexColor (color: string) {
        if (color &&  color.length > 0) {
            if (color[0] === '#' && color.length === 7) {
                return color;
            } else if (color[0] === '#' && color.length === 9) {
                return '#' + color.substr(3, 6);
            } else if (color[0] !== '#' && color.length === 6) {
                return '#' + color;
            } else {
                return color;
            }
        }
    }
}

