import { Injectable, ElementRef } from '@angular/core';

export function isNullOrUndefined(v: any) {
  return v === undefined || v === null;
}

export function isNumber(v: number | string): boolean {
  if (isNullOrUndefined(v)) { return false; }
  return typeof(v) === 'number' || v.match(/^[-+]?(\d+(?:[\.\,]\d*)?)$/) ? true : false;
}

@Injectable()
export class ThyUtilsFunctionsService {

  constructor() { }

  public static getButtonId(event: Event) {
    let id = 0;
    // chrome
    if (event['target'] !== undefined) {
      if (event['target']['id'] !== '') {
        id = event['target']['id'];
      } else {
        id = event['target']['parentElement']['id'];
      }
    }
    return id;
  }

  public static getButtonIdStr(event: Event) {
    let id = '';
    // chrome
    if (event['target'] !== undefined) {
      if (event['target']['id'] !== '') {
        id = event['target']['id'];
      } else {
        id = event['target']['parentElement']['id'];
      }
    }
    return id;
  }

  public static randomColorHex(): string {
    // tslint:disable-next-line:no-bitwise
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }

  public static getColorIntensity(hex: string, intensity?: number) {
    intensity = intensity ? intensity : 50;
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    const r = ((parseInt(hex.slice(0, 2), 16)) + intensity).toString(16),
          g = ((parseInt(hex.slice(2, 4), 16)) + intensity).toString(16),
          b = ((parseInt(hex.slice(4, 6), 16)) + intensity).toString(16);
    return '#' + ThyUtilsFunctionsService.padZero(r) + ThyUtilsFunctionsService.padZero(g) + ThyUtilsFunctionsService.padZero(b);
}

  public static padZero(str) {
      const len = 0 || 2;
      const zeros = new Array(len).join('0');
      return (zeros + str).slice(-len);
  }

  public static buildKeyReference(compoenentName: string, property: string) {
    return compoenentName + '-' + property;
  }

  public static sortObjectByName(a, b) {
    const A = a.Name ? a.Name.toLowerCase() : '';
    const B = b.Name ? b.Name.toLowerCase() : '';
    if (A < B) {
      return -1;
    } else if (A > B) {
      return 1;
    } else {
      return 0;
    }
  }

  public static sortTree(a, b) {
    if (a.IsFolder === b.IsFolder) {
      const A = a.Name ? a.Name.toLowerCase() : '';
      const B = b.Name ? b.Name.toLowerCase() : '';
      if (A < B) {
        return -1;
      } else if (A > B) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (a.IsFolder) {
        return -1;
      } else if (b.IsFolder) {
        return 1;
      }
    }
  }

  // sort on key values
  public static sortByKey(key, desc = false) {
    return (a, b) => desc ? Number((a[key] < b[key])) : Number((a[key] > b[key]));
  }

  public static parsePixelToNumber(pixels: string) {
    return parseFloat(pixels);
  }

  public static remove(array, element) {
    if (array !== undefined) {
      const index = array.indexOf(element);
      array.splice(index, 1);
    }
    return array;
  }

  public static removeById(array: any[], id: number) {
    if (array !== undefined) {
      const index = array.indexOf(array.find(el => el.Id === id));
      array.splice(index, 1);
      return array;
    }
  }

  public static isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }

  public static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public static makeSelectionVisible(table: ElementRef, data: any[], item: any) {
    if (data && item) {
      let index = data.indexOf(item);
      if (index !== undefined && index !== null && !isNaN(index)) {
        try {
          index += 1;
          const elt = document.getElementById(table.nativeElement.id).querySelectorAll('tr')[index];
          if (elt && !ThyUtilsFunctionsService.isInViewPort(elt, table.nativeElement.parentElement)) {
            // Supported on IE, Mozilla, Edge, Chrome
            elt.scrollIntoView(false);
          }
        } catch {}
      }
    }
  }

  public static isInViewPort(elt, parent) {
    const elementTop = elt.offsetTop;
    const elementBottom = elementTop + elt.offsetHeight;

    const viewportTop = parent.scrollTop;
    const viewportBottom = viewportTop + parent.clientHeight;

    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  public static getTableSizeFromElementRef(bodyContainer: ElementRef, additionnalElementRef: ElementRef[]) {
    if (bodyContainer) {
      const bodyHeight = bodyContainer.nativeElement.offsetHeight;
      let lessHeight = 0;
      additionnalElementRef.forEach(e => {
        if (e && e.nativeElement) { lessHeight += e.nativeElement.offsetHeight; }
      });
      return bodyHeight - lessHeight - 20 + 'px';
    }
    return '0px';
  }

  public static toDate(date: string) {
    if (typeof(date) === 'string') {
      return new Date(parseInt(date.substr(6), 10));
    }
  }

  public static getDateForRest(date: Date) {
    return '\/Date(' + date.getTime().toString() + '+' + (-(date.getTimezoneOffset() / 60)) * 100 + ')\/';
  }

}
