
export class ThyGridViewModel3 {

    public Model: any;

    protected _id: number;
    public get Id(): number {
        return this._id;
    }
    public set Id(value: number) {
        this._id = value;
    }

    protected _type: any;
    public get EntityType(): any { return this._type; }
    public set EntityType(value: any) { this._type = value; }

    public selected = false;

}