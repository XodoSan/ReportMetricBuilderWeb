export class ChartMetric {
    public timestamp: string;
    public counter: number;

    constructor(timestamp: string, counter: number) {
        this.timestamp = timestamp;
        this.counter = counter;
    }
}
