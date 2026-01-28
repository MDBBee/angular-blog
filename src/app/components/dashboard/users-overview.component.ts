import { Component, input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardCardComponent } from './dashboard-card.component';
import { UserStats } from '../../models/post.type';

@Component({
  selector: 'app-users-overview',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent],
  template: `
    <app-dashboard-card title="Active Users">
      <div class="space-y-4">
        @for (user of users(); track user.id) {
          <div
            class="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r hover:shadow-lg transition-all duration-300"
            [class.from-blue-500/20]="true"
            [class.to-transparent]="true"
          >
            <div class="flex items-center gap-3 flex-1">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold"
              >
                {{ user.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-semibold text-foreground">{{ user.name }}</p>
                <p class="text-xs text-muted-foreground">{{ user.role }}</p>
              </div>
            </div>
            <div class="flex gap-6 items-center">
              <div class="text-right">
                <p class="text-sm font-bold text-blue-400">
                  {{ user.postsCount }}
                </p>
                <p class="text-xs text-muted-foreground">Posts</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold text-purple-400">
                  {{ user.commentsCount }}
                </p>
                <p class="text-xs text-muted-foreground">Comments</p>
              </div>
              <div class="text-right">
                <span
                  [class.bg-green-500/20]="user.status === 'active'"
                  [class.bg-red-500/20]="user.status === 'inactive'"
                  [class.text-green-400]="user.status === 'active'"
                  [class.text-red-400]="user.status === 'inactive'"
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {{ user.status | titlecase }}
                </span>
              </div>
            </div>
          </div>
        }
        @if (users().length === 0) {
          <div class="text-center py-8">
            <p class="text-muted-foreground">No users found</p>
          </div>
        }
      </div>
    </app-dashboard-card>
  `,
})
export class UsersOverviewComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  users = input<UserStats[]>([]);

  ngOnInit() {
    // Users are passed from parent component
  }
}
