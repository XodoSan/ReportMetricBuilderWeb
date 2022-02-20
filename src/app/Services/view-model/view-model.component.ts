import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent
{
  constructor() {}

  MakeChart(metricsTimestamp: any, metricsCounts: any) 
  {
    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: metricsTimestamp,
        datasets: [{
          label: 'Вхождения метрик',
          data: metricsCounts,
          backgroundColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}