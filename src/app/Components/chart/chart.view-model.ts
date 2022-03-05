import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';

@Injectable({
    providedIn: 'root',
})
export class ChartViewModel
{
  public myChart: any;
  
  MakeChart(metricsTimestamp: any, metricsCounts: any) 
  {
    if (this.myChart != undefined)
    {
      this.myChart.destroy();
    }
    
    this.myChart = new Chart("myChart", {
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