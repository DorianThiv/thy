import { Component } from '@angular/core';
import { ThyTreeComponent } from '../thy-tree.component';
import { ThyTreeService } from '../thy-tree.service';
import { ThyBaseTreeModel } from '../../thy-base/models-base/thy-base-tree-model.class';
import { ThyBaseTreeDto } from '../../thy-base/models-base/thy-base-dto.class';
import { ThyTreeExtendedViewModel } from '../models/thy-tree-extended-view.class';
import { ThyRefreshEvent, ThyRefreshType } from '../../../thy-services/thy-notifications/thy-notifications.service';
import { ThyTreeViewModel } from '../models/thy-tree-view.class';
import { ThyTreeExtendedChangeEvent } from '../models/thy-tree-change.event';

@Component({
  selector: 'app-thy-tree-extended',
  templateUrl: '../thy-tree.component.html',
  styleUrls: ['../thy-tree.component.scss']
})
export class ThyTreeExtendedComponent extends ThyTreeComponent {

  protected _dragging: ThyTreeExtendedViewModel;

  constructor(treeService: ThyTreeService) {
    super(treeService);
  }

  /**
   * Initilize `dataSource` list with given models.
   * @param models `ThyBaseTreeModel<ThyBaseTreeDto>[]`
   */
  public initialize(models: ThyBaseTreeModel<ThyBaseTreeDto>[]) {
    if (models) {
      this._viewModels = models.map(m => new ThyTreeExtendedViewModel(m));
      this.dataSource.data = this.service.getTree(this._viewModels);
    }
  }

  public initialize2(viewModels: ThyTreeViewModel[]) {
    if (viewModels) {
      this._viewModels = viewModels;
      this.dataSource.data = this.service.getTree2(this._viewModels);
    }
  }

  /**
   * Refresh the current list.
   * @todo Check how to add correctly an element into the tree to display arrow of parent.
   * @param {ThyRefreshEvent} event `ThyRefreshEvent`
   */
  public refresh(event?: ThyRefreshEvent, vmClass?: any) {
    if (this.dataSource && this._viewModels && event && vmClass) {
      let foundedVm: ThyTreeViewModel = null;
      switch (event.type) {
        case ThyRefreshType.Create:
        case ThyRefreshType.Update:
          foundedVm = this._viewModels.find(vm => vm.id === event.id && vm.type === event.objectType);
          if (!foundedVm) {
            if (!event.model) {
              throw new Error('Cannot create new tree view model : event.model is undefined');
            }
            foundedVm = new vmClass(event.model);
            this._viewModels.push(foundedVm);
          } else {
            // Comment cause it's disable options
            // foundedVm.update(event.model);
          }
          break;
        case ThyRefreshType.Delete:
          const idx = this._viewModels.indexOf(this._viewModels.find(vm => vm.id === event.id && vm.type === event.objectType));
          if (idx !== -1) {
            this._viewModels.splice(idx, 1);
          }
          break;
      }
      this.dataSource.data = this.service.getTree(this._viewModels);
    }
  }

  public arrowVisibility(node: ThyTreeViewModel): 'hidden' | 'unset' {
    if (!node.children || node.children.length === 0) { return 'hidden'; }
    if (!this.onlyFolder) { return 'unset'; }
    if (node.children) {
      return node.children.find(n => n.isFolder) ? 'unset' : 'hidden';
    }
    return 'hidden';
  }

  public onDrop(event: DragEvent, node: ThyTreeExtendedViewModel) {
    if (node.isDroppable) {
      this.treeChange.emit(new ThyTreeExtendedChangeEvent(node, [this._dragging]));
      this._dragging = null;
    }
  }

}
