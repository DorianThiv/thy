
export class ThyLayoutHorizontalDragEndEvent {

    public sizes: { up: number, down: number };

    constructor(up: number, down: number) {
        this.sizes = { up: up, down: down };
    }

}
