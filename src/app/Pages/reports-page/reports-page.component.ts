import { Component } from '@angular/core';
import { ChartComponent } from 'src/app/Components/chart/chart.component';
import { MetricService } from 'src/app/Services/metric-service';
import { ReportsPageViewModel } from './reports-page.view-model';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent
{  
  public ReportsPageViewModel: ReportsPageViewModel;

  constructor(private metricService: MetricService, private chartComponent: ChartComponent) 
  {
    this.ReportsPageViewModel = new ReportsPageViewModel(this.metricService, this.chartComponent);    
  }
}