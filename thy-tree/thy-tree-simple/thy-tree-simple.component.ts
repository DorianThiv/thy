import { Component} from '@angular/core';
import { ThyTreeComponent } from '../thy-tree.component';
import { ThyTreeService } from '../thy-tree.service';
import { ThyTreeSimpleViewModel } from '../models/thy-tree-simple-view.class';
import { ThyTreeViewModel } from '../models/thy-tree-view.class';

@Component({
  selector: 'app-thy-tree-simple',
  templateUrl: '../thy-tree.component.html',
  styleUrls: ['../thy-tree.component.scss']
})
export class ThyTreeSimpleComponent extends ThyTreeComponent {

  constructor(treeService: ThyTreeService) {
    super(treeService);
  }

  /**
   * Initialize
   * @param models
   */
  public initialize(models: ThyTreeSimpleViewModel[]) {
    if (models) {
      this._viewModels = models;
      this.dataSource.data = models;
    }
  }

  public refresh(models?: ThyTreeSimpleViewModel[]) {
    if (models) {
      this._viewModels = models;
    }
    this.dataSource.data = [];
    this.dataSource.data = this._viewModels;
  }

  public refreshEvent(event: any, viewModels: ThyTreeViewModel[], vmClass: any) {
    if (this.dataSource && viewModels && event && vmClass) {
      let foundedVm = null;
      switch (event.type) {
        case 'create':
        case 'update':
          foundedVm = viewModels.find(vm => vm.id === event.id && vm.type === event.objectType);
          if (!foundedVm) {
            if (!event.model) {
              throw new Error('Cannot create new tree view model : event.model is undefined');
            }
            foundedVm = new vmClass(event.model);
            viewModels.push(foundedVm);
          } else {
            foundedVm.update(event.model);
          }
          break;
        case 'delete':
          const idx = viewModels.indexOf(viewModels.find(vm => vm.id === event.id && vm.type === event.objectType));
          if (idx !== -1) {
            viewModels.splice(idx, 1);
          }
          break;
      }
      console.log(this.service.getTree2(viewModels));
      this.dataSource.data = this.service.getTree2(viewModels);
    }
  }
}
