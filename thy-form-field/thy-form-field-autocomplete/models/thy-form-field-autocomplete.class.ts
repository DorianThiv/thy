export class ThyFormFieldAutocompleteTree<T extends any> {

    public model: T;
    public id: number;
    public name: string;
    public level: number;

    constructor(model: T) {
        if (model) {
            this.model = model;
            this.id = model.id;
            this.name = model.name;
            this.level = model.level;
        }
    }

}
