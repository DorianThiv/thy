import { Injectable } from '@angular/core';
import { ThyLoginService } from '../../../thy-core/thy-login/thy-login.service';
import { ThyRest2Service } from '../../thy-services/thy-rest/thy-rest2.service';
import { ThyRestPostRequest } from '../../thy-services/thy-rest/models/thy-rest-requests.class';

@Injectable({
  providedIn: 'root'
})
export class ThyFileImportService {

  constructor(private restService: ThyRest2Service, private loginService: ThyLoginService) { }

  public async upload(file: File) {
    if (file) {
      const map = new Map<string, string>();
      map.set('name', file.name);
      const request = new ThyRestPostRequest(this.loginService.session, 'UploadFile', file, map);
      const response = await this.restService.post<any>(request);
      return response ? response.UniqueName : null;
    }
  }
}
