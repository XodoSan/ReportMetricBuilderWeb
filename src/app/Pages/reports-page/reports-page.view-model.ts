import { ChartViewModel } from "src/app/Components/chart/chart.view-model";
import { ChartMetric } from "src/app/Entities/chart-metric";
import { CheckboxItem } from "src/app/Entities/checkbox-item";
import { MetricService } from "src/app/Services/metric-service";

export class ReportsPageViewModel{
    public checkboxProviders: CheckboxItem[] = [];
    public checkboxMetrics: CheckboxItem[] = [];
    public year: number = 0;
    
    private chartMetrics: ChartMetric[] = [];
    private allProviders = true;
    private allMetrics = true;

    private metricsTimestamp: any;
    private metricsCount: any;
    

    constructor(private metricService: MetricService, private chartViewModel: ChartViewModel)
    {
        this.checkboxProviders.push(new CheckboxItem(0, 'Hotel', false));
        this.checkboxProviders.push(new CheckboxItem(1, 'HotelAlt', false));
        this.checkboxProviders.push(new CheckboxItem(2, 'Hostel', false));
        this.checkboxProviders.push(new CheckboxItem(3, 'Apartment', false));
        this.checkboxProviders.push(new CheckboxItem(4, 'Sanatorium', false));
        this.checkboxProviders.push(new CheckboxItem(5, 'Camp', false));
        this.checkboxProviders.push(new CheckboxItem(6, 'Glamping', false));
        this.checkboxProviders.push(new CheckboxItem(7, 'TourOperator', false));
    
        this.checkboxMetrics.push(new CheckboxItem(0, 'BookingWindowcomparisonType:', false));
        this.checkboxMetrics.push(new CheckboxItem(1, 'GeneralBookingCharts', false));
        this.checkboxMetrics.push(new CheckboxItem(2, 'CancellationcomparisonType:', false));
        this.checkboxMetrics.push(new CheckboxItem(3, 'OccupancyRate', false));
        this.checkboxMetrics.push(new CheckboxItem(4, 'DemandCalendar', false));
        this.checkboxMetrics.push(new CheckboxItem(5, 'SalesDistribution', false));
        this.checkboxMetrics.push(new CheckboxItem(6, 'ShowMoreFeedbacks', false));
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

    async ShowChart()
    {
        this.chartMetrics = await this.metricService.GetChartMetrics(this.checkboxProviders, this.checkboxMetrics, this.year);
        
        this.metricsTimestamp = this.chartMetrics.map((requiredDatas: any) => requiredDatas.timestamp);
        this.metricsCount = this.chartMetrics.map((requiredDatas: any) => requiredDatas.counter);
        
        this.metricService.chartMetrics = [];
        this.chartViewModel.MakeChart(this.metricsTimestamp, this.metricsCount);
    }
}