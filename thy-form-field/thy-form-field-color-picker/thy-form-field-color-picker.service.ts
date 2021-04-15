import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThyFormFieldColorPickerService {

  public get presets(): string[] { return [
      '#C00000',
      '#FF0000',
      '#FFC000',
      '#FFFF00',
      '#92D050',
      '#00B050',
      '#00B0F0',
      '#0070C0',
      '#002060',
      '#7030A0',
      'rgb(0,0,0)'
    ];
  }

  public isRgbaAlpha(value: string) {
    if (value && value.startsWith('rgba')) {
      const idx1 = value.indexOf('(');
      const idx2 = value.indexOf(')');
      const substr = value.substring(idx1 + 1, idx2);
      const array = substr ? substr.split(',') : [];
      const alpha = array[3] ? Number(array[3]) : null;
      return alpha === 0 ? true : false;
    }
  }

}
