import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ChartMetric } from "../Entities/chart-metric";
import { CheckboxItem } from "../Entities/checkbox-item";
import { MetricService } from "../Services/metric-service";
import { ViewModelComponent } from "./Pages/view-model/view-model.component";

@Component({
    selector: 'app-reports-page-view-model',
    template: '<app-metric-service [checkboxProviders]="checkboxProviders" [checkboxMetrics]="checkboxMetrics" [year]="year"></app-metric-service> <app-view-model></app-view-model>'
})
export class ReportsPageViewModel implements OnInit
{
    @ViewChild(MetricService) serviceChild!: MetricService;
    @ViewChild(ViewModelComponent) viewChild!: ViewModelComponent;

    @Input('checkboxProviders') public checkboxProviders: CheckboxItem[] = [];
    @Input('checkboxMetrics') public checkboxMetrics: CheckboxItem[] = [];
    @Input('year') public year: number = 0;
    
    private chartMetrics: ChartMetric[] = [];

    private metricsTimestamp: any;
    private metricsCount: any;
    private allProviders = true;
    private allMetrics = true;

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

        this.checkboxMetrics.push(new CheckboxItem(0, 'BookingWindowcomparisonType', false));
        this.checkboxMetrics.push(new CheckboxItem(1, 'GeneralBookingCharts', false));
        this.checkboxMetrics.push(new CheckboxItem(2, 'CancellationcomparisonType', false));
        this.checkboxMetrics.push(new CheckboxItem(3, 'OccupancyRate', false));
        this.checkboxMetrics.push(new CheckboxItem(4, 'DemandCalendar', false));
        this.checkboxMetrics.push(new CheckboxItem(5, 'SalesDistribution', false));
        this.checkboxMetrics.push(new CheckboxItem(6, 'ShowMoreFeedbacks', false));
    }

    async ShowChart()
    {
        this.chartMetrics = await this.serviceChild.GetRequiredData();

        this.metricsTimestamp = this.chartMetrics.map((requiredDatas: any) => requiredDatas.timestamp);
        this.metricsCount = this.chartMetrics.map((requiredDatas: any) => requiredDatas.counter);
        
        this.serviceChild.chartMetrics = [];
        this.viewChild.MakeChart(this.metricsTimestamp, this.metricsCount);
    }

    async SelectAllCheckboxProviders(checkboxItem: CheckboxItem[])
    {    
        for (var i = 0; i < checkboxItem.length; i++)
        {
            checkboxItem[i].checked = this.allProviders;
        }
        this.allProviders = !this.allProviders;
    }

    async SelectAllCheckboxMetrics(checkboxItem: CheckboxItem[])
    {    
        for (var i = 0; i < checkboxItem.length; i++)
        {
            checkboxItem[i].checked = this.allMetrics;
        }
        this.allMetrics = !this.allMetrics;
    }
}