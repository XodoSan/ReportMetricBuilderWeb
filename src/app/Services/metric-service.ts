import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { ChartMetric } from '../Entities/chart-metric';
import { MetricByDay } from '../Entities/metric-by-day';
import { CheckboxItem } from '../Entities/checkbox-item';

@Injectable({
    providedIn: 'root',
})
export class MetricService
{
    public chartMetrics: ChartMetric[] = [];

    private _http: HttpClient;

    constructor(http: HttpClient)
    {
        this._http = http;
    }
    
    public async GetChartMetrics
    (
        checkboxProviders: CheckboxItem[], 
        checkboxMetrics: CheckboxItem[], 
        year: number): Promise<ChartMetric[]>
    {
        let providerTypes = this.FillingProviderTypes(checkboxProviders);
        let metricDescriptions = this.FillingMetrics(checkboxMetrics);
        
        let metricsByDays: MetricByDay[] = await this._http
            .get<MetricByDay[]>('/api/Chart/GetData/' + year + '/' + providerTypes.join('&'))
            .toPromise();

        this.FillingChartMetrics(metricDescriptions, metricsByDays);

        return this.chartMetrics;
    }

    private FillingProviderTypes(checkboxProviders: CheckboxItem[]): number[]
    {
        let providerTypes: number[] = [];

        for (var i = 0; i < checkboxProviders.length; i++)
        {
            if (checkboxProviders[i].checked == true)
            {
                providerTypes.push(checkboxProviders[i].id);
            }
        }

        return providerTypes;
    }
    
    private FillingMetrics(checkboxMetrics: CheckboxItem[]): string[]
    {
        let metricsDescriptions: string[] = [];

        for (var i = 0; i < checkboxMetrics.length; i++)
        {
            if (checkboxMetrics[i].checked == true)
            {
                metricsDescriptions.push(checkboxMetrics[i].label);
            }
        }

        return metricsDescriptions
    }

    private FillingChartMetrics(metricDescriptions: string[], metricsByDays: MetricByDay[]) : ChartMetric[]
    {
        let calculator: number = 0;

        for (var i = 0; i < metricsByDays.length; i++)
        {
            for (var j = 0; j < metricsByDays[i].metricCounts.length; j++)
            {
                if (metricDescriptions.includes(metricsByDays[i].metricCounts[j].description))
                {
                    calculator += metricsByDays[i].metricCounts[j].counter;
                }
            }

            this.chartMetrics.push(new ChartMetric(moment(metricsByDays[i].timestamp).format('YYYY-MM-DD'), calculator));
            calculator = 0;
        }     

        return this.chartMetrics;
    }
}