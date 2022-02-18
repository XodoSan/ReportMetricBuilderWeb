import { Component, OnInit, Provider, ViewChild } from '@angular/core';
import { CheckboxItem } from 'src/app/Entities/checkbox-item';
import { RequiredData } from 'src/app/Entities/required-data';
import { MetricServiceComponent } from 'src/app/Services/metric-service/metric-service.component';
import { ViewModelComponent } from 'src/app/Services/view-model/view-model.component';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit 
{  
  checkboxItems: CheckboxItem[] = [];
  requiredDatas: RequiredData[] = [];
  providerTypes: Provider[] = [];

  metricsTimestamp: any;
  metricsCount: any;
  year = 0;

  constructor() {}
  
  @ViewChild(MetricServiceComponent) serviceChild!: MetricServiceComponent;
  @ViewChild(ViewModelComponent) viewChild!: ViewModelComponent;

  ngOnInit() //Способ задания чекбокс итемов
  {
    this.checkboxItems.push(new CheckboxItem(0, 'Hotel', false));
    this.checkboxItems.push(new CheckboxItem(1, 'HotelAlt', false));
    this.checkboxItems.push(new CheckboxItem(2, 'Hostel', false));
    this.checkboxItems.push(new CheckboxItem(3, 'Apartment', false));
    this.checkboxItems.push(new CheckboxItem(4, 'Sanatorium', false));
    this.checkboxItems.push(new CheckboxItem(5, 'Camp', false));
    this.checkboxItems.push(new CheckboxItem(6, 'Glamping', false));
    this.checkboxItems.push(new CheckboxItem(7, 'TourOperator', false));
  }

  async ShowChart()
  {
    this.requiredDatas = await this.serviceChild.GetRequiredData();

    this.metricsTimestamp = this.requiredDatas.map((requiredDatas: any) => requiredDatas.timestamp);
    this.metricsCount = this.requiredDatas.map((requiredDatas: any) => requiredDatas.counter);
    
    this.viewChild.MakeChart(this.metricsTimestamp, this.metricsCount);
  }

  async CreateExcelDocument()
  {
    this.serviceChild.FillingProviderTypes();
    window.location.href='http://localhost:5000/api/Excel/Reports/' + this.year + '/' + this.serviceChild.providerTypes;
  }
}