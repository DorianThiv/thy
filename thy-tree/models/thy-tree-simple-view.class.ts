import { ThyTreeViewModel } from './thy-tree-view.class';

export interface ThyTreeSimpleProperties {

    Model?: any;

    id?: number;
    type?: any;
    name?: string;
    icon?: string;
    iconColor?: string;
    details?: string;
    detailsSuffix?: string;
    parent?: ThyTreeViewModel;
    parentId?: number;
    parentType?: any;
    isFolder?: boolean;
    isDraggable?: boolean;
    isDroppable?: boolean;
    isContextable?: boolean;
    isLazy?: boolean;
    level?: number;
    children?: ThyTreeViewModel[];
    childrenTypes?: any[];

}

export class ThyTreeSimpleViewModel extends ThyTreeViewModel {

    constructor(parameters?: ThyTreeSimpleProperties) {
        super();
        if (parameters) {
            this.Model = parameters.Model;
            this.update(parameters);
            this.children = parameters.children;
        }
    }

    public update(parameters: ThyTreeSimpleProperties) {
        this.id = parameters.id;
        this.type = parameters.type;
        this.name = parameters.name;
        this.icon = parameters.icon;
        this.iconColor = parameters.iconColor;
        this.details = parameters.details;
        this.detailsSuffix = parameters.detailsSuffix;
        this.parentId = parameters.parentId;
        this.parentType = parameters.parentType;
        this.childrenTypes = parameters.childrenTypes;
        this.isFolder = parameters.isFolder;
        this.isDraggable = parameters.isDraggable;
        this.isDroppable = parameters.isDroppable;
        this.isLazy = parameters.isLazy;
    }

}
