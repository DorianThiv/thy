export class ThyListViewModel {

    public icon: string;

    private _name: string;
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value;}
    public editing = false;
    public selected = false;
    public disabled = false;
    public isNew = false;

}
