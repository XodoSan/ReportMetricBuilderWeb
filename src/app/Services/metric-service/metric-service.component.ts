import { Component, Input, OnInit } from '@angular/core';
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
export class MetricServiceComponent {
  @Input('checkboxItems') checkboxItems: CheckboxItem[] = [];
  @Input('year') year: number = 0;

  calculator: number = 0;

  metrics: MetricByDay[] = [];
  requiredDatas: RequiredData[] = [];
  providerTypes: number[] = [];

  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  async GetRequiredData(): Promise<RequiredData[]> {
    this.FillingProviderTypes();

    this.metrics = await this._http
      .get<MetricByDay[]>('/api/Chart/GetData/' + this.year + '/' + this.providerTypes + '/')
      .toPromise();

    this.FillingRequiredDatas();

    return this.requiredDatas;
  }

  async FillingProviderTypes() {
    for (var i = 0; i < this.checkboxItems.length; i++) {
      if (this.checkboxItems[i].checked == true) {
        this.providerTypes.push(this.checkboxItems[i].id);
      }
    }
  }

  private FillingRequiredDatas() {
    for (var i = 0; i < this.metrics.length; i++) {
      for (var j = 0; j < this.metrics[i].metricCounts.length; i++) {
        this.calculator += this.metrics[i].metricCounts[j].counter;
      }

      this.requiredDatas.push(new RequiredData(moment(this.metrics[i].timestamp).format('YYYY-MM-DD'), this.calculator));
      this.calculator = 0;
    }
  }
}
