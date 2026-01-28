import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="w-full h-full flex items-center justify-center">
      <canvas
        baseChart
        [type]="'doughnut'"
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
export class DoughnutChartComponent {
  chartData = input<any>({
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 2,
      },
    ],
  });

  chartOptions = input<any>({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
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
  });
}
