import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DateRange = '7days' | '30days' | '90days' | '1year';

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="dashboard-filters flex flex-wrap gap-2 p-4 rounded-lg bg-slate-700/20 border border-slate-700/30"
    >
      <button
        *ngFor="let range of dateRanges"
        (click)="selectRange(range)"
        [class.active]="selectedRange === range"
        class="px-4 py-2 rounded-lg transition-all duration-300"
        [class.bg-gradient-to-r]="selectedRange === range"
        [class.from-blue-500]="selectedRange === range"
        [class.to-blue-600]="selectedRange === range"
        [class.text-white]="selectedRange === range"
        [class.bg-slate-600/30]="selectedRange !== range"
        [class.text-muted-foreground]="selectedRange !== range"
        [class.hover:bg-slate-600/50]="selectedRange !== range"
      >
        {{ range }}
      </button>

      <div class="flex-1 flex gap-2 ml-auto">
        <button
          class="px-4 py-2 rounded-lg bg-slate-600/30 text-muted-foreground hover:bg-slate-600/50 transition-all"
        >
          🔄 Refresh
        </button>
        <button
          class="px-4 py-2 rounded-lg bg-slate-600/30 text-muted-foreground hover:bg-slate-600/50 transition-all"
        >
          ⬇️ Export
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class DashboardFiltersComponent {
  selectedRange: DateRange = '30days';
  dateRanges: DateRange[] = ['7days', '30days', '90days', '1year'];

  rangeSelected = output<DateRange>();

  selectRange(range: DateRange) {
    this.selectedRange = range;
    this.rangeSelected.emit(range);
  }
}
