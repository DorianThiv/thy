
import { ThyTreeSimpleProperties } from './thy-tree-simple-view.class';
import { ThyTreeViewModel } from './thy-tree-view.class';

export class ThyTreeTypedViewModel<T extends { update: Function }> extends ThyTreeViewModel {

    public Model: T;

    constructor(model: T, options?: ThyTreeSimpleProperties) {
        super();
        this.Model = model;
        if (options) {
            this._id = options.id;
            this._type = options.type;
            this._name = options.name;
            this._icon = options.icon;
            this._iconColor = options.iconColor;
            this._details = options.details;
            this._detailsSuffix = options.detailsSuffix;
            this._parentId = options.parentId;
            this._parentType = options.parentType;
            this._isFolder = options.isFolder;
            this._isDraggable = options.isDraggable;
            this._isDroppable = options.isDroppable;
            this._isLazy = options.isLazy;
            this.childrenTypes = options.childrenTypes;
        }
        // this.update(options);
    }

    public update(options: ThyTreeSimpleProperties) {
        if (options) {
            // this._id = options.id;
            // this._type = options.type;
            // this._name = options.name;
            // this._icon = options.icon;
            // this._iconColor = options.iconColor;
            // this._details = options.details;
            // this._detailsSuffix = options.detailsSuffix;
            // this._parentId = options.parentId;
            // this._parentType = options.parentType;
            // this._isFolder = options.isFolder;
            // this._isDraggable = options.isDraggable;
            // this._isDroppable = options.isDroppable;
            // this._isLazy = options.isLazy;
            // this.childrenTypes = options.childrenTypes;
        }
    }


}
