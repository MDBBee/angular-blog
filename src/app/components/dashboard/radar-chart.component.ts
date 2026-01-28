import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="w-full h-full flex items-center justify-center">
      <canvas
        baseChart
        [type]="'radar'"
        [data]="chartData()"
        [options]="chartOptions()"
        class="max-w-full"
      ></canvas>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class RadarChartComponent {
  chartData = input<any>({
    labels: [
      'Engagement',
      'Reach',
      'Growth',
      'Quality',
      'Performance',
      'Retention',
    ],
    datasets: [
      {
        label: 'This Month',
        data: [65, 59, 90, 81, 56, 85],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Last Month',
        data: [45, 49, 70, 61, 46, 65],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        pointBackgroundColor: 'rgb(139, 92, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(139, 92, 246)',
      },
    ],
  });

  chartOptions = input<any>({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            weight: 500,
          },
          padding: 15,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          stepSize: 20,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11,
          },
        },
      },
    },
  });
}
