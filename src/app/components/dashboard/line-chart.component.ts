import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="w-full h-full flex items-center justify-center">
      <canvas
        baseChart
        [type]="'line'"
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
export class LineChartComponent {
  chartData = input<any>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [65, 59, 80, 81, 56, 85, 90],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointBorderWidth: 2,
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
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  });
}
