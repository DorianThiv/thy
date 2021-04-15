export class ThyFormFieldAutocompleteTreeModel {

    public model: any;

    public get id(): number { return this.model.Id; }
    public get name(): string { return this.model.Name; }
    public get label(): string { return this.model.Name; }
    public get parentId(): number { return this.model.ParentId; }
    public get isexpandable(): boolean { return this.children && this.children.length > 0; }
    public data: any;
    public icon: any;
    public expandedIcon: any;
    public collapsedIcon: any;
    public children: ThyFormFieldAutocompleteTreeModel[];
    public leaf: boolean;
    public expanded: boolean;
    public type: string;
    public parent: ThyFormFieldAutocompleteTreeModel;
    public partialSelected: boolean;
    public styleClass: string;
    public draggable: boolean;
    public droppable: boolean;
    public selectable: boolean;
    public key: string;
    public selected = false;

    public get level(): number {
        let total = 1;
        if (this.parent) {
            total += this.parent.level ? this.parent.level : 0;
        }
        return total;
    }

    public get hasChildren(): boolean {
        return this.children && this.children.length > 0;
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

    constructor(model: any) {
        this.model = model;
    }

}
