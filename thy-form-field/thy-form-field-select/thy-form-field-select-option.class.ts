
export class ThyFormFieldSelectOption {

    public Name: string;
    public Value: any;
    public Icon: string;
    public Disabled: boolean;
    public Visible: boolean;
    public IsSvgIcon: boolean;

    constructor(name: string, value: any, icon?: string, disabled = false, visible = true, svgIcon = false) {
        this.Name = name;
        this.Value = value;
        this.Icon = icon;
        this.Disabled = disabled;
        this.Visible = visible;
        this.IsSvgIcon = svgIcon;
    }
}
