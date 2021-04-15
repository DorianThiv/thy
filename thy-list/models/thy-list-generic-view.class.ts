export class ThyListGenericViewModel<T extends { Name: string }> {

    public model: T;
    public editModel: T;
    public get name(): string { return this.model ? this.model.Name : ''; }
    public icon: string;
    public editing = false;
    public isNew = false;

    constructor(model?: T, icon?: string) {
        this.model = model;
        this.icon = icon;
    }

}
