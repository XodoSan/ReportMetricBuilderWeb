export class MetricCount {
    public description: string;
    public counter: number;

    constructor(description: string, counter: number) {
        this.description = description;
        this.counter = counter;
    }
}
