import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ThyFileSaverService {

  constructor() { }

  /**
   * Save a file on computer.
   * @param {string} data Content of file `string`.
   * @param {string} filename Name of file. User will be able to change name in browser window.
   * @param {string} extension All extension is accepted.
   * @param {boolean} addHeader Add header (Exemple: BOM `\xef\xbb\xbf`) `default: true`.
   * @param {Uint8Array} forceHeader Put a header at start of file. Works if `addHeader = true`.
   */
  public save(data: string | Blob, filename: string, extension: string, addHeader: boolean = true, forceHeader: Uint8Array = new Uint8Array([0xef, 0xbb, 0xbf])): void {
    const file = !(data instanceof Blob) ? addHeader ? new Blob([forceHeader, data]) : new Blob([data]) : data;
    saveAs(file, `${filename}.${extension}`);
  }

}
