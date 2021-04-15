import { Injectable } from '@angular/core';
import { ThyFileSaverService } from '../thy-file-saver/thy-file-saver.service';

export const CSV_FR_SEP = ';';
export const CSV_EN_SEP = ',';

@Injectable({
  providedIn: 'root'
})
export class ThyExporterService {

  constructor(private fileSaver: ThyFileSaverService) { }

  public exportToCsv(titles: string[], values: any[][], separator = CSV_EN_SEP, name = 'thy') {
    let csv = '';
    csv += titles.join(separator);
    csv += '\r\n';
    const dates = values[0] ? values[0].map(v => v['d']) : [];
    for (let i = 0; i < dates.length; i++) {
      csv += `${dates[i]}${separator}${values.map(value => value && value[i] && value[i]['v'] ? value[i]['v'] : '').join(separator)}\r\n`;
    }
    if (csv) {
      this.fileSaver.save(csv, name, 'csv');
    }
  }
}
