import { MetricCount } from "./metric-count";

export class MetricByDay {
    public timestamp: Date;
    public metricCounts: MetricCount[];

    constructor(timestamp: Date, metricCounts: MetricCount[]) {
        this.timestamp = timestamp;
        this.metricCounts = metricCounts;
    }
}
