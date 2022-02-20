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
  checkboxMetrics: CheckboxItem[] = [];
  checkboxProviders: CheckboxItem[] = [];
  requiredDatas: RequiredData[] = [];
  providerTypes: Provider[] = [];

  metricsTimestamp: any;
  metricsCount: any;
  year = 0;
  counter = 0;

  constructor() {}
  
  @ViewChild(MetricServiceComponent) serviceChild!: MetricServiceComponent;
  @ViewChild(ViewModelComponent) viewChild!: ViewModelComponent;

  ngOnInit()
  {
    this.checkboxProviders.push(new CheckboxItem(0, 'Hotel', false));
    this.checkboxProviders.push(new CheckboxItem(1, 'HotelAlt', false));
    this.checkboxProviders.push(new CheckboxItem(2, 'Hostel', false));
    this.checkboxProviders.push(new CheckboxItem(3, 'Apartment', false));
    this.checkboxProviders.push(new CheckboxItem(4, 'Sanatorium', false));
    this.checkboxProviders.push(new CheckboxItem(5, 'Camp', false));
    this.checkboxProviders.push(new CheckboxItem(6, 'Glamping', false));
    this.checkboxProviders.push(new CheckboxItem(7, 'TourOperator', false));

    this.checkboxMetrics.push(new CheckboxItem(0, 'BookingWindowcomparisonType:', false))
    this.checkboxMetrics.push(new CheckboxItem(1, 'GeneralBookingCharts', false))
    this.checkboxMetrics.push(new CheckboxItem(2, 'CancellationcomparisonType:', false))
    this.checkboxMetrics.push(new CheckboxItem(3, 'OccupancyRate', false))
    this.checkboxMetrics.push(new CheckboxItem(4, 'DemandCalendar', false))
    this.checkboxMetrics.push(new CheckboxItem(5, 'SalesDistribution', false))
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

  async SelectAllCheckboxItems(checkboxItem: CheckboxItem[])
  {    
    for (var i = 0; i < checkboxItem.length; i++)
    {
      checkboxItem[i].checked = !checkboxItem[i].checked;
    }
  }
}