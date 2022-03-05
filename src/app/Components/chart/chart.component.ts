import { Component, Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartViewModel } from './chart.view-model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class ChartComponent
{
  public chartViewModel: ChartViewModel;
  public myChart: Chart;

  constructor() 
  {
    this.chartViewModel = new ChartViewModel();    
    this.myChart = this.chartViewModel.myChart;
  }
}