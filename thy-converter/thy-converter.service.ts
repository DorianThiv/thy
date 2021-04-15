import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThyConverterService {

  constructor() { }

  public stringToJsObject(str: string) {
    if (!str) { return null; }
    try {
      if (str.startsWith('{') || str.startsWith('[')) {
        return JSON.parse(str);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public stringToJsObjectTyped<T>(str: string): T {
    if (!str) { return null; }
    try {
      if (str.startsWith('{') || str.startsWith('[')) {
        return JSON.parse(str);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public jsObjectToString(obj: object) {
    if (!obj) { return null; }
    try {
      if (obj) {
        return JSON.stringify(obj, );
      }
    } catch (error) {
      console.log(error);
    }
  }

}
