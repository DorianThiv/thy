import { Injectable } from '@angular/core';
import { ThyTreeViewModel } from './models/thy-tree-view.class';
import { ThyObjectType } from '../../thy-services/thy-objects/thy-types.class';
import { ThyLocationType } from '../../../thy-public/thy-locations/models/thy-location-type.class';

@Injectable({
  providedIn: 'root'
})
export class ThyTreeService {

  constructor() { }

  public getTree(viewModels: ThyTreeViewModel[]) {
    const parent = viewModels ? viewModels.filter(v => v.id < 0) : [];
    this.updateChildren(parent, viewModels);
    return parent;
  }

  public updateChildren(listOfParents: ThyTreeViewModel[], listOfAllViewModels: ThyTreeViewModel[]) {
    listOfParents.forEach(parent => {
      if (parent.type === ThyObjectType.Folder) {
        const children = listOfAllViewModels.filter(rep => (rep.parentId === parent.id));
        if (children) {
          parent.children = children.sort((a, b) => this.sortTree(a, b));
        }
        this.updateChildren(parent.children.filter(c => c.isFolder), listOfAllViewModels);
      }
    });
  }

  public getTree2(viewModels: ThyTreeViewModel[]) {
    const parents = viewModels ? viewModels.filter(vm => !this.hasParent(vm.parentId, viewModels)) : [];
    this.addChildren(parents, viewModels);
    return parents;
  }

  public addChildren(listOfParents: ThyTreeViewModel[], listOfAllViewModels: ThyTreeViewModel[]) {
    listOfParents.forEach(parent => {
      const children = listOfAllViewModels.filter(rep => (rep.parentId === parent.id && rep.parentType === parent.type));
      if (children) {
        parent.children = children.sort((a, b) => this.sortTree(a, b));
      }
      this.addChildren(parent.children, listOfAllViewModels);
    });
  }

  private hasParent(parentId: number, list: ThyTreeViewModel[]): boolean {
    return list.find(l => l.id === parentId) ? true : false;
  }

  public sortTree(a: ThyTreeViewModel, b: ThyTreeViewModel) {
    if (a.isFolder === b.isFolder) {
      const A = a.name ? a.name.toLowerCase() : '';
      const B = b.name ? b.name.toLowerCase() : '';
      if (A < B) {
        return -1;
      } else if (A > B) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (a.isFolder) {
        return -1;
      } else if (b.isFolder) {
        return 1;
      }
    }
  }
}
