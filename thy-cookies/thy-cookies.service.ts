import { Injectable } from '@angular/core';

export const COOKIE_CONSTENT_TOKEN = 'weevent_token';

@Injectable({
  providedIn: 'root'
})
export class ThyCookiesService {

    constructor() {
    }

    public get(name: string) {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;
      for (let i: number = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) == 0) {
              return c.substring(cookieName.length, c.length);
          }
      }
      return null;
    }

    public set(name: string, value: string, expireMinutes = 60, path: string = '') {
      let d: Date = new Date();
      d.setTime(d.getTime() + expireMinutes * 60 * 1000);
      let expires:string = `expires=${d.toUTCString()}`;
      let cpath:string = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  public delete(name: string) {
      this.set(name, '', -1);
  }

}
