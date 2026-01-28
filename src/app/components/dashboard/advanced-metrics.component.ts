import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from './dashboard-card.component';

export interface Metric {
  label: string;
  value: number;
  unit: string;
  trend: number;
  status: 'up' | 'down' | 'neutral';
}

@Component({
  selector: 'app-advanced-metrics',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent],
  template: `
    <app-dashboard-card [title]="title()">
      <div class="space-y-4">
        @for (metric of metrics(); track metric.label) {
          <div
            class="flex items-center justify-between p-4 rounded-lg bg-slate-700/20 border border-slate-700/30 hover:border-slate-600/50 transition-all"
          >
            <div class="flex-1">
              <p class="text-sm font-medium text-muted-foreground">
                {{ metric.label }}
              </p>
              <p class="text-2xl font-bold mt-1">
                {{ metric.value }}{{ metric.unit }}
              </p>
            </div>
            <div class="text-right">
              <div
                [class.text-green-400]="metric.status === 'up'"
                [class.text-red-400]="metric.status === 'down'"
                [class.text-gray-400]="metric.status === 'neutral'"
                class="text-lg font-bold"
              >
                {{
                  metric.status === 'up'
                    ? '📈'
                    : metric.status === 'down'
                      ? '📉'
                      : '➡️'
                }}
              </div>
              <p
                class="text-xs mt-1"
                [class.text-green-400]="metric.status === 'up'"
                [class.text-red-400]="metric.status === 'down'"
                [class.text-gray-400]="metric.status === 'neutral'"
              >
                {{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}%
              </p>
            </div>
          </div>
        }
      </div>
    </app-dashboard-card>
  `,
})
export class AdvancedMetricsComponent {
  title = input<string>('Advanced Metrics');
  metrics = input<Metric[]>([]);
}
