import { Component, Input } from '@angular/core';
import { MetricByDay } from '../../Entities/metric-by-day';
import { RequiredData } from '../../Entities/required-data';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { CheckboxItem } from 'src/app/Entities/checkbox-item';

@Component({
  selector: 'app-metric-service',
  templateUrl: './metric-service.component.html',
  styleUrls: ['./metric-service.component.css']
})
export class MetricServiceComponent
{
  @Input('checkboxProviders') checkboxProviders: CheckboxItem[] = [];
  @Input('checkboxMetrics') checkboxMetrics: CheckboxItem[] = [];
  @Input('year') year: number = 0;

  calculator: number = 0;

  metricsByDays: MetricByDay[] = [];
  requiredDatas: RequiredData[] = [];
  providerTypes: number[] = [];
  metricsDescriptions: string[] = [];
  
  private _http: HttpClient;

  constructor(http: HttpClient)
  {
    this._http = http;
  }
  
  async GetRequiredData(): Promise<RequiredData[]>
  {    
    this.FillingProviderTypes();
    this.FillingMetrics();
    
    this.metricsByDays = await this._http
      .get<MetricByDay[]>('/api/Chart/GetData/' + this.year + '/' + this.providerTypes.join('&'))
      .toPromise();

    this.FillingRequiredDatas();

    this.providerTypes = [];
    this.metricsDescriptions = [];

    return this.requiredDatas;
  }

  async FillingProviderTypes()
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

      this.requiredDatas.push(new RequiredData(moment(this.metricsByDays[i].timestamp).format('YYYY-MM-DD'), this.calculator));
      this.calculator = 0;
    }     
  }
}