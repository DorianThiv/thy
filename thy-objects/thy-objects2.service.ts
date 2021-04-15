import { Injectable } from '@angular/core';
import { ThyBaseService } from '../../thy-modules/thy-base/thy-base.service';
import { ThyLoginService } from '../../../thy-core/thy-login/thy-login.service';
import { ThyRestPostRequest } from '../thy-rest/models/thy-rest-requests.class';
import { ThyRest2Service } from '../thy-rest/thy-rest2.service';

@Injectable({
  providedIn: 'root'
})
export class ThyObjects2Service {

  private _services: ThyBaseService[] = [];

  constructor(private loginService: ThyLoginService, private restService: ThyRest2Service) { }

  public async initialize(percents = { value: 0 }) {
    let value = 0;
    if (this._services) {
      const serviceNumber = this._services.length;
      for (const service of this._services) {
        percents.value = (++value * 100) / serviceNumber;
        if (service && service.get) {
          await service.get();
        }
      }
    }
  }

  public subscribe(service: ThyBaseService) {
    this._services.push(service);
  }

  public async getObjectIds(references: string[]): Promise<string[]> {
    if (references) {
      references.forEach(n => { if (n && (n[0] === '{' || n[0] === '[')) { n = n.slice(1, n.length - 1); } });
      if (references && references[0] !== null && references[0] !== undefined) {
        const request = new ThyRestPostRequest(this.loginService.session, 'GetObjectIds', { SessionKey: this.loginService.session, ObjectNames: references });
        const response = await this.restService.post(request);
        return response && response['ObjectIdStrs'] ? response['ObjectIdStrs'] : [];
      }
    }
  }

  public async getReferences(objectIds: string[]): Promise<string[]> {
    if (objectIds) {
      const request = new ThyRestPostRequest(this.loginService.session, 'GetObjectNames', { SessionKey: this.loginService.session, ObjectIds: objectIds });
      const response = await this.restService.post(request);
      return response ? response['ObjectNames'] : [];
    }
  }

}
