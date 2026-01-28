import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class=" rounded-2xl p-6 shadow-lg border-2  border-accent h-full bg-background hover:shadow-xl transition-all duration-300"
    >
      @if (title()) {
        <h2 class="text-lg font-semibold mb-4 text-foreground">
          {{ title() }}
        </h2>
      }
      <ng-content></ng-content>
    </div>
  `,
})
export class DashboardCardComponent {
  title = input<string>('');
}
