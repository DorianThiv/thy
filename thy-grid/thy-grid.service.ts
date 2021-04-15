import { Injectable } from '@angular/core';
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
  public refresh(event: any, dataSource: MatTableDataSource<any>, vmClass: any, service: any) {
    // if (!event || !dataSource || !vmClass || !service) { return; }
    // switch (event.type) {
    //   case ThyRefreshType.Hard:
    //     break;
    //   case ThyRefreshType.Create:
    //   case ThyRefreshType.Update:
    //     let foundedVm = dataSource.data.find(vm => vm.Id === event.id);
    //     if (!foundedVm) {
    //       foundedVm = new vmClass(service.getById(event.id));
    //       dataSource.data.push(foundedVm);
    //     }
    //     service.update([foundedVm.Model]);
    //     break;
    //   case ThyRefreshType.Delete:
    //     const idx = dataSource.data.indexOf(dataSource.data.find(vm => vm.Id === event.id));
    //     if (idx !== -1) {
    //       dataSource.data.splice(idx, 1);
    //     }
    //     break;
    // }
    // dataSource._updateChangeSubscription();
  }

}
