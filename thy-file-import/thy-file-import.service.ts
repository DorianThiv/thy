import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThyFileImportService {

  constructor() { }

  public async upload(file: File) {
    // if (file) {
    //   const map = new Map<string, string>();
    //   map.set('name', file.name);
    //   const request = new ThyRestPostRequest(this.loginService.session, 'UploadFile', file, map);
    //   const response = await this.restService.post<any>(request);
    //   return response ? response.UniqueName : null;
    // }
    return null;
  }
}
