import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import {
  DashboardService,
  DashboardMetrics,
  UserStats,
  PostAnalytics,
} from '../../services/dashboard.service';
import { StatCardComponent } from '../../components/dashboard/stat-card.component';
import { DashboardCardComponent } from '../../components/dashboard/dashboard-card.component';
import { PieChartComponent } from '../../components/dashboard/pie-chart.component';
import { BarChartComponent } from '../../components/dashboard/bar-chart.component';
import { LineChartComponent } from '../../components/dashboard/line-chart.component';
import { DoughnutChartComponent } from '../../components/dashboard/doughnut-chart.component';
import { RadarChartComponent } from '../../components/dashboard/radar-chart.component';
import { UsersOverviewComponent } from '../../components/dashboard/users-overview.component';
import {
  AdvancedMetricsComponent,
  Metric,
} from '../../components/dashboard/advanced-metrics.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    StatCardComponent,
    DashboardCardComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    UsersOverviewComponent,
    AdvancedMetricsComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  // Signals for reactive data
  metrics = signal<DashboardMetrics | null>(null);
  userStats = signal<UserStats[]>([]);
  postAnalytics = signal<PostAnalytics | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Chart data signals
  topicsPieChartData = signal<any>(null);
  postsBarChartData = signal<any>(null);
  engagementLineChartData = signal<any>(null);
  userActivityBarChartData = signal<any>(null);
  deviceDoughnutChartData = signal<any>(null);
  performanceRadarChartData = signal<any>(null);

  // Advanced metrics
  systemMetrics = signal<Metric[]>([
    {
      label: 'API Response Time',
      value: 245,
      unit: 'ms',
      trend: -12,
      status: 'up',
    },
    { label: 'Server Load', value: 45, unit: '%', trend: 5, status: 'down' },
    {
      label: 'Database Queries/s',
      value: 1250,
      unit: '',
      trend: 18,
      status: 'up',
    },
    {
      label: 'Active Connections',
      value: 342,
      unit: '',
      trend: 8,
      status: 'up',
    },
  ]);

  contentMetrics = signal<Metric[]>([
    {
      label: 'Avg. Reading Time',
      value: 4.5,
      unit: ' min',
      trend: 3,
      status: 'up',
    },
    { label: 'Bounce Rate', value: 32, unit: '%', trend: -8, status: 'up' },
    { label: 'Share Rate', value: 12, unit: '%', trend: 15, status: 'up' },
    {
      label: 'Avg. Post Length',
      value: 1240,
      unit: ' words',
      trend: -5,
      status: 'down',
    },
  ]);

  constructor() {
    // Effect to update chart data when analytics change
    effect(() => {
      const analytics = this.postAnalytics();
      if (analytics) {
        this.updateCharts();
      }
    });
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.isLoading.set(true);
    this.dashboardService.loadAllDashboardData().subscribe({
      next: (data) => {
        this.metrics.set(data.metrics);
        this.userStats.set(data.userStats);
        this.postAnalytics.set(data.postAnalytics);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.error.set('Failed to load dashboard data');
        this.isLoading.set(false);
      },
    });
  }

  private updateCharts(): void {
    const analytics = this.postAnalytics();
    if (!analytics) return;

    // Topics Pie Chart
    this.topicsPieChartData.set({
      labels: analytics.topicCounts.map((t) => t.topic),
      datasets: [
        {
          data: analytics.topicCounts.map((t) => t.count),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(168, 85, 247, 0.8)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(139, 92, 246)',
            'rgb(236, 72, 153)',
            'rgb(34, 197, 94)',
            'rgb(251, 146, 60)',
            'rgb(14, 165, 233)',
            'rgb(168, 85, 247)',
          ],
          borderWidth: 2,
        },
      ],
    });

    // Posts by Date Bar Chart
    this.postsBarChartData.set({
      labels: analytics.postsByDate.slice(0, 10).map((p) => p.date),
      datasets: [
        {
          label: 'Posts',
          data: analytics.postsByDate.slice(0, 10).map((p) => p.count),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(236, 253, 245, 0.8)',
            'rgba(254, 243, 199, 0.8)',
            'rgba(248, 113, 113, 0.8)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(139, 92, 246)',
            'rgb(236, 72, 153)',
            'rgb(34, 197, 94)',
            'rgb(251, 146, 60)',
            'rgb(14, 165, 233)',
            'rgb(168, 85, 247)',
            'rgb(236, 253, 245)',
            'rgb(254, 243, 199)',
            'rgb(248, 113, 113)',
          ],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    });

    // Engagement Line Chart
    this.engagementLineChartData.set({
      labels: analytics.postsByDate.slice(0, 10).map((p) => p.date),
      datasets: [
        {
          label: 'Total Engagement',
          data: analytics.postsByDate.slice(0, 10).map((p) => p.count * 5),
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

    // User Activity Bar Chart
    const topUsers = this.userStats()
      .sort(
        (a, b) =>
          b.postsCount + b.commentsCount - (a.postsCount + a.commentsCount),
      )
      .slice(0, 6);
    this.userActivityBarChartData.set({
      labels: topUsers.map((u) => u.name),
      datasets: [
        {
          label: 'Posts',
          data: topUsers.map((u) => u.postsCount),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
          borderRadius: 8,
        },
        {
          label: 'Comments',
          data: topUsers.map((u) => u.commentsCount),
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderColor: 'rgb(139, 92, 246)',
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    });

    // Device Distribution Doughnut Chart
    this.deviceDoughnutChartData.set({
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [
        {
          data: [55, 30, 15],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(34, 197, 94, 0.8)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(236, 72, 153)',
            'rgb(34, 197, 94)',
          ],
          borderWidth: 2,
        },
      ],
    });

    // Performance Radar Chart
    this.performanceRadarChartData.set({
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
          label: 'Current',
          data: [75, 85, 70, 88, 92, 80],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(59, 130, 246)',
        },
        {
          label: 'Target',
          data: [80, 90, 85, 90, 95, 85],
          borderColor: 'rgb(139, 92, 246)',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          pointBackgroundColor: 'rgb(139, 92, 246)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(139, 92, 246)',
        },
      ],
    });
  }

  get filteredUserStats(): UserStats[] {
    return this.userStats().slice(0, 8);
  }
}
