import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="w-full h-full flex items-center justify-center">
      <canvas
        baseChart
        [type]="'bar'"
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
export class BarChartComponent {
  chartData = input<any>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Posts',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
          'rgb(34, 197, 94)',
          'rgb(251, 146, 60)',
          'rgb(14, 165, 233)',
        ],
        borderWidth: 2,
        borderRadius: 8,
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
