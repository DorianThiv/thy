import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ThyFormFieldAutocompleteComponent } from '../thy-form-field-autocomplete.component';
import { of, Observable } from 'rxjs';
import { ThyFormFieldAutocompleteTreeModel } from '../models/thy-from-field-autocomplete-tree-model.class';

@Component({
  selector: 'thy-form-field-autocomplete-tree',
  templateUrl: './thy-form-field-autocomplete-tree.component.html',
  styleUrls: ['./thy-form-field-autocomplete-tree.component.scss']
})
export class ThyFormFieldAutocompleteTreeComponent extends ThyFormFieldAutocompleteComponent {

  protected _list: ThyFormFieldAutocompleteTreeModel[];
  @Input() set list(list: ThyFormFieldAutocompleteTreeModel[]) {
    this._list = this.getTree(list);
    if (this.formController) {
      this.filteredList = of(this.filter(null));
      this.resizePanel();
    }
  }

  /**
   * @property {Observable<any[]>} `filteredModels`
   * Observable list to display content when user write in input autocomplete.
   */
  public filteredList: Observable<ThyFormFieldAutocompleteTreeModel[]>;

  constructor() {
    super();
  }

  public getClasses(): string[] {
    const classes = this.class ? this.class.split(' ') : [];
    const formClass = !this.noFormField ? ['thy-form-field'] : ['thy-no-form-field'];
    return [].concat(classes, formClass);
  }

  protected filter(value: string) {
    if (!this._list || !value) { return this._list ? this._list : []; }
    if (typeof(value) === 'string') {
      const filterValue = value.toLowerCase();
      const models = this._list.filter(ent => ent.name.toLowerCase().indexOf(filterValue) !== -1);
      const parents = [];
      for (const model of models) {
        this.findParent(model, parents);
      }
      return this.getTree([].concat(parents, models), true);
    }
  }

  private findParent(model: ThyFormFieldAutocompleteTreeModel, parents: ThyFormFieldAutocompleteTreeModel[]) {
    if (model.parent) {
      if (parents.indexOf(parents.find(p => p.id === model.parent.id)) === -1) {
        parents.push(model.parent);
        model.parent.expanded = true;
        this.findParent(model.parent, parents);
      }
    }
  }

  public displayWithFunc(value: ThyFormFieldAutocompleteTreeModel) {
    if (!value) { return ''; }
    return value.name;
  }

  private getTree(models: ThyFormFieldAutocompleteTreeModel[], keepStates = false) {
    if (!models) { return []; }
    models.forEach(vm => {
      if (!models.find(v => v.id === vm.parentId)) { vm.parent = null; }
    });
    const _locationsList: ThyFormFieldAutocompleteTreeModel[] = [];
    const filteredModels = models ? models.filter(loc => !loc.parentId).sort((a, b) => this.sortTree(a, b)) : [];
    return this.addToList(_locationsList, filteredModels, models, keepStates);
  }

  private addToList(modelList: ThyFormFieldAutocompleteTreeModel[], modelsToAdd: ThyFormFieldAutocompleteTreeModel[], allModels: ThyFormFieldAutocompleteTreeModel[], keepStates: boolean) {
    modelsToAdd.forEach(sloc => {
      let children = allModels.filter(loc => (loc.parentId === sloc.id));
      if (children) {
        children = children.sort((a, b) => this.sortTree(a, b));
        sloc.children = children;
        sloc.children.forEach(c => c.parent = sloc);
      }
      modelList.push(sloc);
      modelList = this.addToList(modelList, children, allModels, keepStates);
    });
    return modelList;
  }

  private sortTree(a: ThyFormFieldAutocompleteTreeModel, b: ThyFormFieldAutocompleteTreeModel) {
    const A = a.name ? a.name.toLowerCase() : '';
    const B = b.name ? b.name.toLowerCase() : '';
    if (A < B) {
      return -1;
    } else if (A > B) {
      return 1;
    } else {
      return 0;
    }
  }

  public onInput(value: string) {
    this.filteredList = of(this.filter(value));
    if (!this.auto.isOpen) {
      this.trigger.openPanel();
    }
    setTimeout(() => this.resizePanel());
  }

  public onDropdown() {
    this.filteredList = of(this.filter(''));
    this.trigger.openPanel();
    setTimeout(() => this.resizePanel());
  }

  public onExpand(event: MouseEvent, element: any) {
    if (element) {
      event.preventDefault();
      event.stopPropagation();
      element.expanded = !element.expanded;
    }
  }

  public onClosePane() {
    this._list.forEach(m => m.expanded = false);
  }

}
