import { Injectable } from '@angular/core';

import * as XmlJs from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class ThyXmlService {

  constructor() { }

  public deserialize(xml: string) {
    if (!xml) { return null; }
    try {
      const options: XmlJs.Options.XML2JS = {
        compact: true
      };
      return XmlJs.xml2js(xml, options);
    } catch (error) {
      console.log(error);
    }
  }

  public serialize(obj: any, error?: String) {
    try {
      const options: XmlJs.Options.JS2XML = {
        compact: true,
        spaces: 2,
        attributeValueFn: (value: string) => this.sanitize(value)
      };
      return XmlJs.js2xml(obj, options);
    } catch (error: any) {
      // tslint:disable-next-line: no-construct
      error = new String(error);
      console.log(error);
    }
    return null;
  }

  private sanitize(value: string) {
    if (value === 'undefined' || value === 'null') {
      return undefined;
    }
    if (value) {
      return value.replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  // .replace(/"/g, '&quot;')
                  // .replace(/&/g, '&amp;')
                  .replace(/'/g, '&apos;');
    }
  }

}
