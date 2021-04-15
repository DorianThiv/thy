import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

export const PLATFORM_MOBILE_WIDTH = 1200;

@Injectable({
  providedIn: 'root'
})
export class ThyPlatformService {

  public get isMobile(): boolean { return window.screen.availWidth <= PLATFORM_MOBILE_WIDTH; }
  // public get isMobile(): boolean { return this.platform.ANDROID || this.platform.IOS; }

  constructor(private platform: Platform) {
  }

}
