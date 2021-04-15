

export class ThyGridViewModel<T> {

    public Model: T;

    protected _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    protected _type: any;
    public get type(): any { return this._type; }
    public set type(value: any) { this._type = value; }

    protected _name: string;
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    protected _icon: string;
    public get icon(): string { return this._icon; }
    public set icon(value: string) { this._icon = value; }

    public selected = false;

    constructor(model?: T) {
        this.Model = model;
    }

}
