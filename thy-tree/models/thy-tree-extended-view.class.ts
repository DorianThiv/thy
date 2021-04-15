import { ThyTreeViewModel } from './thy-tree-view.class';
import { ThyBaseTreeModel } from '../../thy-base/models-base/thy-base-tree-model.class';
import { ThyBaseTreeDto } from '../../thy-base/models-base/thy-base-dto.class';

export class ThyTreeExtendedViewModel extends ThyTreeViewModel {

    public Model: ThyBaseTreeModel<ThyBaseTreeDto>;

    constructor(model: ThyBaseTreeModel<ThyBaseTreeDto>) {
        super();
        this.Model = model;
        this.update(model);
    }

    public update(model: ThyBaseTreeModel<ThyBaseTreeDto>) {
        this.id = model.Id;
        this.type = model.EntityType;
        this.name = model.Name;
        this.icon = model.iconMat ? model.iconMat : model.Icon;
        this.parentId = model.FolderId;
        this.parentType = model.ParentType;
        this.childrenTypes = model.ChildrenTypes;
        this.isFolder = model.IsFolder;
        this.isDraggable = model.IsDraggable;
        this.isDroppable = model.IsDroppable;
    }

}
