import { ThyObjectType } from "../../thy-objects/thy-types.class";


export abstract class ThyTreeViewModel {

    public Model: any;

    /**
     * Unique identifier.
     */
    protected _id: number;
    public get id(): number { return this._id; }
    public set id(value: number) { this._id = value; }

    /**
     * Entity type to find a specific object in tree.
     */
    protected _type: any;
    public get type(): any { return this._type; }
    public set type(value: any) { this._type = value; }

    /**
     * Name label to display
     */
    protected _name: string;
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    /**
     * Item icon (Material)
     */
    protected _icon: string;
    public get icon(): string { return this._icon; }
    public set icon(value: string) { this._icon = value; }

    /**
     * Icon color for a status or something else
     */
    protected _iconColor: string;
    public get iconColor(): string { return this._iconColor; }
    public set iconColor(value: string) { this._iconColor = value; }

    /**
     * Item details `Ex: (3 Devices)`
     */
    protected _details: string;
    public get details(): string { return this._details; }
    public set details(value: string) { this._details = value; }

    protected _detailsSuffix: string;
    public get detailsSuffix(): string { return this._detailsSuffix; }
    public set detailsSuffix(value: string) { this._detailsSuffix = value; }

    protected _parent: ThyTreeViewModel;
    public get parent(): ThyTreeViewModel { return this._parent; }
    public set parent(value: ThyTreeViewModel) { this._parent = value; }

    protected _parentId: number;
    public get parentId(): number { return this._parentId; }
    public set parentId(value: number) { this._parentId = value; }

    protected _parentType: ThyObjectType;
    public get parentType(): ThyObjectType { return this._parentType; }
    public set parentType(value: ThyObjectType) { this._parentType = value; }

    protected _isFolder: boolean;
    public get isFolder(): boolean { return this._isFolder; }
    public set isFolder(value: boolean) { this._isFolder = value; }

    /**
     * User action to grab item.
     */
    protected _isDraggable: boolean;
    public get isDraggable(): boolean { return this._isDraggable; }
    public set isDraggable(value: boolean) { this._isDraggable = value; }

    /**
     * User action to drop item.
     */
    protected _isDroppable: boolean;
    public get isDroppable(): boolean { return this._isDroppable; }
    public set isDroppable(value: boolean) { this._isDroppable = value; }

    protected _level: number;
    public get level(): number { return this._level; }
    public set level(value: number) { this._level = value; }

    protected _isLazy = false;
    public get isLazy(): boolean { return this._isLazy; }
    public set isLazy(value: boolean) { this._isLazy = value; }

    protected _isLoading = false;
    public get isLoading(): boolean { return this._isLoading; }
    public set isLoading(value: boolean) { this._isLoading = value; }

    protected _isDisplay = true;
    public get isDisplay(): boolean { return this._isDisplay; }
    public set isDisplay(value: boolean) { this._isDisplay = value; }

    protected _hasMenu = true;
    public get hasMenu(): boolean { return this._hasMenu; }
    public set hasMenu(value: boolean) { this._hasMenu = value; }

    protected _showDetails = true;
    public get showDetails(): boolean { return this._showDetails; }
    public set showDetails(value: boolean) { this._showDetails = value; }

    public get isEmpty(): boolean {  return false; }
    public get expandable(): boolean { return !!this.children && this.children.length > 0; }

    public children: ThyTreeViewModel[] = [];
    public childrenTypes: any[] = [];
    public selected = false;

    public abstract update(model: any);

}
