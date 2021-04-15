import { ThyGridViewModel } from './thy-grid-view.class';

export class ThyGridTreeViewModel<TModel extends any> extends ThyGridViewModel<TModel> {

    public get ParentId(): number { return (this.Model as any).ParentId; }
    public get FolderId(): number { return (this.Model as any).FolderId; }

    public parent: ThyGridTreeViewModel<any>;
    public children: ThyGridTreeViewModel<any>[];
    public expanded: boolean;
    public draggable: boolean;
    public droppable: boolean;
    public selectable: boolean;

    public get level(): number {
        let total = 1;
        if (this.parent) {
            total += this.parent.level ? this.parent.level : 0;
        }
        return total;
    }

    public get hasParent(): boolean { return this.parent ? true : false; }

    public get hasChildren(): boolean {
        return this.children && this.children.length > 0;
    }

    public get hasNoChildren(): boolean {
        return !this.children || this.children.length === 0;
    }

    public get isExpanded(): boolean {
        if (this.parent) {
            return this.expanded && this.parent.isExpanded;
        } else {
            return this.expanded;
        }
    }

    public get isHidden(): boolean {
        if (this.parent) {
            return !this.parent.isExpanded;
        } else {
            return false;
        }
    }

    constructor(model: TModel) {
        super(model);
    }


}
