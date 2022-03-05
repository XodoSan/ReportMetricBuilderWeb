import { Component } from '@angular/core';
import { ChartViewModel } from 'src/app/Components/chart/chart.view-model';
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

  constructor(private metricService: MetricService, private chartViewModel: ChartViewModel) 
  {
    this.ReportsPageViewModel = new ReportsPageViewModel(this.metricService, this.chartViewModel);    
  }
}