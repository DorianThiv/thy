import { Input, ViewChild, Output, EventEmitter, Directive } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTree } from '@angular/material/tree';
import { ThyTreeViewModel } from './models/thy-tree-view.class';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ThyTreeService } from './thy-tree.service';
import { ThyObjectType } from '../../thy-services/thy-objects/thy-types.class';
import { ThyTreeExtendedChangeEvent } from './models/thy-tree-change.event';

const NodeAll = -5;

@Directive()
export abstract class ThyTreeComponent {

  @ViewChild('tree', {static: false}) tree: MatTree<ThyTreeViewModel>;
  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;

  /**
   * Context menu to show in tree `MatMenu`.
   */
  @Input() menu: MatMenu;

  /**
   * Hide all items except folders. Disabled visibility of arrows.
   * Based on `isFolder` property.
   */
  @Input() onlyFolder = false;

  /**
   * Selection change event.
   */
  @Output() selectionChange = new EventEmitter<ThyTreeViewModel>();

  @Output() expandChange = new EventEmitter<ThyTreeViewModel>();

  /**
   * Emitting when user drag and drop node in another.
   */
  @Output() treeChange = new EventEmitter<ThyTreeExtendedChangeEvent>();

  /**
   * @private
   * Flat list of view models instance.
   */
  protected _viewModels: ThyTreeViewModel[];

  public get viewModels(): ThyTreeViewModel[] { return this._viewModels; }

  /**
   * @private
   * Current selection
   */
  protected _selection: ThyTreeViewModel = null;

  /**
   * Return the current selection.
   */
  public get selection(): ThyTreeViewModel { return this._selection; }

  /**
   * Set the current selection and set the `selected` property
   * to `true`.
   * @param value `ThyTreeViewModel`.
   */
  public set selection(value: ThyTreeViewModel) {
    if (this._selection) {
      this._selection.selected = false;
    }
    if (value) {
      value.selected = true;
    }
    this._selection = value;
  }

  public treeControl: FlatTreeControl<ThyTreeViewModel>;
  // @ts-ignore
  public treeFlattener: MatTreeFlattener;
  // @ts-ignore
  public dataSource: MatTreeFlatDataSource<ThyTreeViewModel, ThyTreeViewModel>;

  /**
   * Context menu position.
   * Use to open the contextual menu at the right click position.
   */
  public contextMenuPosition = { x: 0, y: 0 };

  protected _dragging: ThyTreeViewModel = null;

  /**
   * Use to transform object into tree.
   * Function return current node using `ThyTreeViewModel` class.
   */
  protected _transformer = (node: ThyTreeViewModel, level: number) => {
    node.level = level;
    return node;
  }

  /**
   * Show expand arrow if node has children or is lazy loading mode.
   */
  public hasChild = (_: number, node: ThyTreeViewModel) => {
    return ((node.children && node.children.length > 0) || node.isFolder || node.isLazy) && !node.isEmpty ? true : false;
  }

  /**
   * Unused. Find solution to hide all nodes which aren't folders.
   */
  public isDisplayable = (_: number, node: ThyTreeViewModel) => {
    if (this.onlyFolder) {
      return node.isFolder ? true : false;
    }
    return node.isDisplay;
  }

  constructor(protected service: ThyTreeService) {
    this.treeControl = new FlatTreeControl<ThyTreeViewModel>(node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(this._transformer, element => element.level, element => element.expandable, element => element.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  /**
   * Initilize `dataSource` list with given models.
   * @param models `ThyBaseTreeModel<ThyBaseTreeDto>[]`
   */
  public abstract initialize(models: any);

  /**
   * Refresh the current list.
   * @todo Check how to add correctly an element into the tree to display arrow of parent.
   * @param {ThyRefreshEvent} event `ThyRefreshEvent`
   */
  public abstract refresh(event?: any);

  public select(node: ThyTreeViewModel) {
    if (!node) { return; }
    this.selection = node;
  }

  public expand(node: ThyTreeViewModel) {
    this.treeControl.expand(node);
  }

  public collapse(node: ThyTreeViewModel) {
    this.treeControl.collapse(node);
  }

  /**
   * Select a node in tree with `id` and `type`
   * @param id `number`
   * @param type `ThyObjectType`
   */
  public selectById(id: number, type: ThyObjectType) {
    this.selection = this.getChild(id, type);
  }

  /**
   * Expand nodes with child `id` and child `type`.
   * All parents will be expand.
   * @param id `number`
   * @param type `ThyObjectType`
   * @todo Expand only if parent is close
   */
  public expandById(id: number, type: ThyObjectType) {
    const node = this.getChild(id, type);
    if (node) {
      this.treeControl.expand(node);
      if (node.parentId) {
        this.expandById(node.parentId, ThyObjectType.Folder);
      }
    }
  }

  /**
   * Find child in current `dataSource` list.
   */
  private getChild(id: number, type: ThyObjectType): ThyTreeViewModel {
    if (!this._viewModels) { return; }
    return this._viewModels.find(node => node.id === id && node.type === type);
  }

  /**
   * Resolve children number in a given node.
   * @param node
   */
  public getChildrenOf(node: ThyTreeViewModel): number {
    if (!this._viewModels || !node || !node.childrenTypes) { return 0; }
    let objects = [];
    try {
      const descendants = this.treeControl.getDescendants(node);
      objects = node.id === NodeAll ? this._viewModels.filter(c => node.childrenTypes.find(t => t === c.type)) : descendants;
    } catch (error) { }
    const children = objects.filter(n => node.childrenTypes.find(t => t === n.type));
    return children ? children.length : 0;
  }

  /**
   * Get parent node parent.
   * @param type The type of parent.
   * @param node Start node.
   */
  public getParent(type: string, node: ThyTreeViewModel): ThyTreeViewModel {
    const parent = node.parent;
    if (parent && parent.type === type) {
      return parent;
    }
    return this.getParent(type, parent);
  }

  public arrowVisibility(node: ThyTreeViewModel): 'hidden' | 'unset' {
    if (!this.onlyFolder) { return 'unset'; }
    if (node.children) {
      return node.children.find(n => n.isFolder) ? 'unset' : 'hidden';
    }
    return 'hidden';
  }

  public onSelection(event: any, node: ThyTreeViewModel) {
    if (event.srcElement.innerText === 'expand_more' || event.srcElement.innerText === 'chevron_right') { return; }
    if (node) {
      this.selection = node;
      this.selectionChange.emit(node);
    }
  }

  public onExpand(event: MouseEvent, node: ThyTreeViewModel) {
    event.stopPropagation();
    if (node.isLazy && this.treeControl.isExpanded(node)) {
      this.collapse(node);
      return;
    } else if (node.isLazy && !this.treeControl.isExpanded(node)) {
      node.isLoading = true;
    } else {
      if (!this.treeControl.isExpanded(node)) {
        this.expand(node);
      } else {
        this.collapse(node);
      }
    }
    this.expandChange.emit(node);
  }

  public onContextMenu(event: any, node?: ThyTreeViewModel) {
    if (this.contextMenu && this.menu) {
      // this.selection = node;
      const element = node ? node.Model : null;
      event.preventDefault();
      if (node && node.hasMenu) {
        this.contextMenuPosition.x = event.clientX;
        this.contextMenuPosition.y = event.clientY;
        this.contextMenu.menuData = { element: element };
        this.contextMenu.openMenu();
      } else {
        this.contextMenuPosition.x = event.clientX;
        this.contextMenuPosition.y = event.clientY;
        this.contextMenu.menuData = { element: null };
        this.contextMenu.openMenu();
      }
    }
  }

  public onDragStart(event: DragEvent, node: ThyTreeViewModel) {
    if (node.isDraggable) {
      this._dragging = node;
    }
  }

  public onDrop(event: DragEvent, node: ThyTreeViewModel) {
    // if (node.isDroppable) {
    //   this.treeChange.emit(new ThyTreeExtendedChangeEvent(node, [this._dragging]));
    //   this._dragging = null;
    // }
  }

  public onDragOver(event: DragEvent, node: ThyTreeViewModel) {
    if (this._dragging.id === node.id && this._dragging.type === node.type) { return; }
    const children = this.treeControl.getDescendants(node);
    if (node.isDroppable) {
      event.preventDefault();
    }
  }

}
