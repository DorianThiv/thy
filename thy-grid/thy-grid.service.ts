import { Injectable } from '@angular/core';
import { ThyBase2Service } from '../thy-base/thy-base2.service';
import { ThyBaseDto } from '../thy-base/models-base/thy-base-dto.class';
import { ThyBaseModel } from '../thy-base/models-base/thy-base-model.class';
import { ThyRefreshEvent, ThyRefreshType } from '../../thy-services/thy-notifications/thy-notifications.service';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class ThyGridService {

  constructor() { }

  /**
   * Refresh the given `dataSource` to update data table.
   * @param {ThyRefreshEvent} event Refersh event.
   * @param {MatTableDataSource} dataSource Table source for material table.
   * @param {typeof} vmClass View model class to be instantiate.
   * @param {ThyBase2Service<ThyBaseDto, ThyBaseModel<ThyBaseDto>>} service Entities service.
   */
  public refresh(event: ThyRefreshEvent, dataSource: MatTableDataSource<any>, vmClass: any, service: ThyBase2Service<ThyBaseDto, ThyBaseModel<ThyBaseDto>>) {
    if (!event || !dataSource || !vmClass || !service) { return; }
    switch (event.type) {
      case ThyRefreshType.Hard:
        break;
      case ThyRefreshType.Create:
      case ThyRefreshType.Update:
        let foundedVm = dataSource.data.find(vm => vm.Id === event.id);
        if (!foundedVm) {
          foundedVm = new vmClass(service.getById(event.id));
          dataSource.data.push(foundedVm);
        }
        service.update([foundedVm.Model]);
        break;
      case ThyRefreshType.Delete:
        const idx = dataSource.data.indexOf(dataSource.data.find(vm => vm.Id === event.id));
        if (idx !== -1) {
          dataSource.data.splice(idx, 1);
        }
        break;
    }
    dataSource._updateChangeSubscription();
  }

}
