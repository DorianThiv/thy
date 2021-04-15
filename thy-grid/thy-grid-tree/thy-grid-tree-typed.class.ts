import { ThyGridTyped } from '../thy-grid-typed.class';
import { ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { ThyGridTreeViewModel } from '../models/thy-grid-tree-view.class';
import { OnInit, ChangeDetectorRef, Directive } from '@angular/core';
import { ThyUtilsFunctionsService } from '../../thy-utils-functions/thy-utils-functions.service';

@Directive()
export abstract class ThyGridTreeTyped<TViewModel extends ThyGridTreeViewModel<any>> extends ThyGridTyped<TViewModel> implements OnInit {

    constructor(protected route: ActivatedRoute, protected cdr: ChangeDetectorRef) {
      super();
    }

    /**
     * Default behaviour for when the route is activated.
     */
    ngOnInit() {
      setTimeout(() => {
        this.route.queryParamMap.subscribe(params => {
          if (this.dataSource && this.dataSource.data && this.dataSource.data.length > 0) {
            const id = params ? Number(params.get('id')) : null;
            if (id) {
              const entity = this.dataSource.data.find(l => l.Id === id);
              if (entity) {
                this.expand(entity);
                this.selection = entity;
                ThyUtilsFunctionsService.makeSelectionVisible(this.table, this.dataSource.data, entity);
                this.onSelection(null, this.selection);
                return;
              }
            }
            this.selection = this.dataSource.data[0];
            this.selectionChange.emit(this.selection);
          }
        });
      });
    }

    public abstract initialize(...args: any[]);

    public abstract refresh(event?: any);

    protected getTree(models: TViewModel[], keepStates = false, sort?: Sort) {
      if (!models) { return []; }
      models.forEach(vm => {
        if (!models.find(v => (v as any).Id === vm.ParentId)) { vm.parent = null; }
      });
      const _locationsList: TViewModel[] = [];
      let filteredModels = models ? models.filter(loc => !loc.ParentId) : [];
      if (filteredModels && sort) {
        filteredModels = this.sortList(filteredModels, sort);
      }
      return this.addToList(_locationsList, filteredModels, models, keepStates, sort);
    }

    protected addToList(modelList: TViewModel[], modelsToAdd: TViewModel[], allModels: TViewModel[], keepStates: boolean, sort: Sort) {
      modelsToAdd.forEach(sloc => {
        let children = allModels.filter(loc => (loc.ParentId === (sloc as any).Id));
        if (children) {
          if (sort) {
            children = this.sortList(children, sort);
          }
          sloc.children = children;
          sloc.children.forEach(c => c.parent = sloc);
        }
        modelList.push(sloc);
        modelList = this.addToList(modelList, children, allModels, keepStates, sort);
      });
      return modelList;
    }

    protected sortList(filteredModels: TViewModel[], sort: Sort) {
      return filteredModels.sort((a, b) => this.sort(sort, a, b));
    }

    public sortData(sort: Sort) {
      if (!sort.active || sort.direction === '') {
        this.dataSource.data = this.getTree(this.viewModels, true);
        return;
      }
      this.dataSource.data = this.getTree(this.dataSource.data.map(d => d), true, sort);
    }

    public levelArray(size: number) {
      const items = [];
      for (let i = 1; i <= size; i++) { items.push(i); }
      return items;
    }

    public collapseAll() {
      if (this.dataSource && this.dataSource.data) {
        let allIsCollapsed = true;
        this.dataSource.data.forEach(d => {
            if (d.level === 1 && d.expanded === true) {
                allIsCollapsed = false;
                return;
            }
        });
        allIsCollapsed ? this.dataSource.data.map(d => d.expanded = true) : this.dataSource.data.map(d => d.expanded = false);
        if (this.cdr) {
          this.cdr.detectChanges();
        }
      }
    }

    public collapse(element: TViewModel) {
    }

    public expand(element: TViewModel) {
      if (element) {
        element.expanded = !element.expanded;
      }
    }

    public onCollapseAll() {
        this.collapseAll();
    }

    public onExpand(event: MouseEvent, element: any) {
      this.expand(element);
      event.stopPropagation();
    }

    public onDoubleClick(event: any, element: TViewModel) {
      if (event.path && event.path[0] && (event.path[0].innerText === 'more_vert' || event.path[0].innerText === 'expand_more')) {
        return;
      }
      this.doubleClickChange.emit(element);
    }

}
