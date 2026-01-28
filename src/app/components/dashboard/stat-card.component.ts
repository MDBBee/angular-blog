import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class=" border-2 border-accent h-full rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <div class="flex justify-between items-start mb-4">
        <div>
          <p class="text-sm font-medium text-muted-foreground">{{ label() }}</p>
          <h3 class="text-3xl text-muted-foreground font-bold mt-2">
            {{ value() }}
          </h3>
          <p class="text-xs text-muted-foreground mt-1">{{ description() }}</p>
        </div>
        <div class="text-4xl opacity-90">{{ icon() }}</div>
      </div>
      @if (showTrend()) {
        <div class="flex items-center gap-1 mt-4">
          <span
            [class.text-green-500]="trend() > 0"
            [class.text-red-500]="trend() < 0"
            class="text-sm font-semibold"
          >
            {{ trend() > 0 ? '+' : '' }}{{ trend() }}%
          </span>
          <span class="text-xs text-muted-foreground">from last month</span>
        </div>
      }
    </div>
  `,
})
export class StatCardComponent {
  label = input<string>('Metric');
  value = input<string | number>('0');
  description = input<string>('');
  icon = input<string>('📊');
  showTrend = input<boolean>(false);
  trend = input<number>(0);
}
