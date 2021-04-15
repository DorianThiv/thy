
import { ThyBaseTreeModel } from '../../thy-base/models-base/thy-base-tree-model.class';
import { ThyBaseTreeDto } from '../../thy-base/models-base/thy-base-dto.class';
import { ThyTreeExtendedViewModel } from './thy-tree-extended-view.class';

export class ThyTreeExtendedChangeEvent {

    public parent: ThyBaseTreeModel<ThyBaseTreeDto>;
    public children: ThyBaseTreeModel<ThyBaseTreeDto>[];

    constructor(parent: ThyTreeExtendedViewModel, children: ThyTreeExtendedViewModel[]) {
        this.parent = parent ? parent.Model : null;
        this.children = children ? children.map(c => c.Model) : [];
    }

}
