import { ThyBaseTreeModel } from '../../thy-base/models-base/thy-base-tree-model.class';
import { ThyBaseTreeDto } from '../../thy-base/models-base/thy-base-dto.class';

export class ThyTreeDragEvent {

    public event: DragEvent;
    public element: ThyBaseTreeModel<ThyBaseTreeDto>;

    constructor(event: DragEvent, element: ThyBaseTreeModel<ThyBaseTreeDto>) {
        this.event = event;
        this.element = element;
    }

}
