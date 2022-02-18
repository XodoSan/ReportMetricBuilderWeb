export class CheckboxItem {
    public id: number;
    public label: string;
    public checked: boolean;

    constructor(id: number, label: string, checked?: boolean) {
        this.id = id;
        this.label = label;
        this.checked = checked ? checked : false;
    }
}
