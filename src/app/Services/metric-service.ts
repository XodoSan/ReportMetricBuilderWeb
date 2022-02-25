import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { ChartMetric } from '../Entities/chart-metric';
import { MetricByDay } from '../Entities/metric-by-day';
import { CheckboxItem } from '../Entities/checkbox-item';

@Component({
  selector: 'app-metric-service',
  template: ''
})
export class MetricService
{
    @Input('checkboxProviders') public checkboxProviders: CheckboxItem[] = [];
    @Input('checkboxMetrics') public checkboxMetrics: CheckboxItem[] = [];
    @Input('year') public year: number = 0;

    public chartMetrics: ChartMetric[] = [];
    private metricsByDays: MetricByDay[] = [];
    private providerTypes: number[] = [];
    private metricsDescriptions: string[] = [];

    private calculator: number = 0;

    private _http: HttpClient;

    constructor(http: HttpClient)
    {
        this._http = http;
    }
    
    async GetRequiredData(): Promise<ChartMetric[]>
    {    
        this.FillingProviderTypes();
        this.FillingMetrics();
        
        this.metricsByDays = await this._http
        .get<MetricByDay[]>('/api/Chart/GetData/' + this.year + '/' + this.providerTypes.join('&'))
        .toPromise();

        this.FillingRequiredDatas();

        this.providerTypes = [];
        this.metricsDescriptions = [];

        return this.chartMetrics;
    }

    private async FillingProviderTypes()
    {
        for (var i = 0; i < this.checkboxProviders.length; i++)
        {
            if (this.checkboxProviders[i].checked == true)
            {
                this.providerTypes.push(this.checkboxProviders[i].id);
            }
        }
    }
    
    private FillingMetrics()
    {
        for (var i = 0; i < this.checkboxMetrics.length; i++)
        {
            if (this.checkboxMetrics[i].checked == true)
            {
                this.metricsDescriptions.push(this.checkboxMetrics[i].label);
            }
        }
    }

    private FillingRequiredDatas()
    {
        for (var i = 0; i < this.metricsByDays.length; i++)
        {
            for (var j = 0; j < this.metricsByDays[i].metricCounts.length; j++)
            {
                if (this.metricsDescriptions.includes(this.metricsByDays[i].metricCounts[j].description))
                {
                    this.calculator += this.metricsByDays[i].metricCounts[j].counter;
                }
            }

            this.chartMetrics.push(new ChartMetric(moment(this.metricsByDays[i].timestamp).format('YYYY-MM-DD'), this.calculator));
            this.calculator = 0;
        }     
    }
}