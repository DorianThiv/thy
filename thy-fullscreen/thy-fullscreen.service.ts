import { Injectable, EventEmitter, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThyFullscreenService {

  public onFullscreenChange: EventEmitter<any>;

  constructor() {
    this.onFullscreenChange = new EventEmitter<any>();
  }

  /**
   * Request to fullscreen an element.
   * @param {any} element Element to request fullscreen
   */
  public requestFullScreen(element: any) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }

  /**
   * Request to fullscreen an element with keyboard input.
   * @param {any} element Element to request fullscreen
   */
  public requestFullScreenWithKeys(element: any) {
    if (element.mozRequestFullScreenWithKeys) {
      element.mozRequestFullScreenWithKeys();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else {
      this.requestFullScreen(element);
    }
  }

  /**
   * Exit fullscreen.
   */
  public exitFullScreen() {
    const doc: any = document;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    }
  }

  @HostListener('document:fullscreenchange', []) fullScreen() {
    this.onFullscreenChange.emit();
  }

}
