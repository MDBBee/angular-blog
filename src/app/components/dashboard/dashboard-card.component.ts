import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="dashboard-card rounded-2xl p-6 shadow-lg border border-border h-full bg-card hover:shadow-xl transition-all duration-300"
    >
      @if (title()) {
        <h2 class="text-lg font-semibold mb-4 text-foreground">
          {{ title() }}
        </h2>
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .dashboard-card {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.05),
          rgba(255, 255, 255, 0.02)
        );
        backdrop-filter: blur(10px);
        border-color: rgba(255, 255, 255, 0.1);
      }
    `,
  ],
})
export class DashboardCardComponent {
  title = input<string>('');
}
