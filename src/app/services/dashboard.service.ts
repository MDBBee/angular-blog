import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  DashboardMetrics,
  PostAnalytics,
  UserStats,
} from '../models/post.type';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private readonly POSTS_URL = 'http://localhost:3000/blogPosts';
  private readonly USERS_URL = 'http://localhost:3000/users';
  private readonly TOPICS_URL = 'http://localhost:3000/topics';

  metrics = signal<DashboardMetrics>({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    activeUsers: 0,
    avgPostsPerUser: 0,
    engagementRate: 0,
  });

  userStats = signal<UserStats[]>([]);
  postAnalytics = signal<PostAnalytics>({
    topicCounts: [],
    postsByDate: [],
    averageComments: 0,
    totalEngagement: 0,
  });

  /**
   * Fetch and calculate dashboard metrics
   */
  loadDashboardMetrics(): Observable<DashboardMetrics> {
    return forkJoin({
      posts: this.http.get<any[]>(this.POSTS_URL),
      users: this.http.get<any[]>(this.USERS_URL),
    }).pipe(
      map(({ posts, users }) => {
        let totalComments = 0;
        posts.forEach((post: any) => {
          totalComments += post.comments ? post.comments.length : 0;
        });

        const metrics: DashboardMetrics = {
          totalUsers: users.length,
          totalPosts: posts.length,
          totalComments,
          activeUsers: Math.ceil(users.length * 0.75),
          avgPostsPerUser:
            users.length > 0
              ? Math.round((posts.length / users.length) * 10) / 10
              : 0,
          engagementRate:
            posts.length > 0
              ? Math.round((totalComments / posts.length) * 100) / 100
              : 0,
        };

        this.metrics.set(metrics);
        return metrics;
      }),
    );
  }

  /**
   * Fetch user statistics
   */
  loadUserStats(): Observable<UserStats[]> {
    return forkJoin({
      posts: this.http.get<any[]>(this.POSTS_URL),
      users: this.http.get<any[]>(this.USERS_URL),
    }).pipe(
      map(({ posts, users }) => {
        const userStats: UserStats[] = users.map((user: any) => {
          const userPosts = posts.filter((p: any) => p.author.id === user.id);
          let comments = 0;
          userPosts.forEach((post: any) => {
            comments += post.comments ? post.comments.length : 0;
          });

          return {
            name: user.name,
            id: user.id,
            postsCount: userPosts.length,
            commentsCount: comments,
            joinDate: '2025-01-01', // Default, can be enhanced
            role: user.role || 'User',
            status: Math.random() > 0.3 ? 'active' : 'inactive',
          };
        });

        this.userStats.set(userStats);
        return userStats;
      }),
    );
  }

  /**
   * Fetch post analytics
   */
  loadPostAnalytics(): Observable<PostAnalytics> {
    return this.http.get<any[]>(this.POSTS_URL).pipe(
      map((posts) => {
        // Count posts by topic
        const topicMap = new Map<string, number>();
        posts.forEach((post: any) => {
          topicMap.set(post.topic, (topicMap.get(post.topic) || 0) + 1);
        });

        const topicCounts = Array.from(topicMap.entries())
          .map(([topic, count]) => ({ topic, count }))
          .sort((a, b) => b.count - a.count);

        // Count posts by date
        const dateMap = new Map<string, number>();
        posts.forEach((post: any) => {
          const date = post.date || '2025-01-01';
          dateMap.set(date, (dateMap.get(date) || 0) + 1);
        });

        const postsByDate = Array.from(dateMap.entries())
          .map(([date, count]) => ({ date, count }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        // Calculate average comments
        let totalComments = 0;
        posts.forEach((post: any) => {
          totalComments += post.comments ? post.comments.length : 0;
        });
        const averageComments =
          posts.length > 0
            ? Math.round((totalComments / posts.length) * 100) / 100
            : 0;

        const analytics: PostAnalytics = {
          topicCounts,
          postsByDate,
          averageComments,
          totalEngagement: totalComments,
        };

        this.postAnalytics.set(analytics);
        return analytics;
      }),
    );
  }

  /**
   * Get all dashboard data at once
   */
  loadAllDashboardData(): Observable<{
    metrics: DashboardMetrics;
    userStats: UserStats[];
    postAnalytics: PostAnalytics;
  }> {
    return forkJoin({
      posts: this.http.get<any[]>(this.POSTS_URL),
      users: this.http.get<any[]>(this.USERS_URL),
      topics: this.http.get<any[]>(this.TOPICS_URL),
    }).pipe(
      map(({ posts, users, topics }) => {
        // Calculate metrics
        let totalComments = 0;
        posts.forEach((post: any) => {
          totalComments += post.comments ? post.comments.length : 0;
        });

        const metrics: DashboardMetrics = {
          totalUsers: users.length,
          totalPosts: posts.length,
          totalComments,
          activeUsers: Math.ceil(users.length * 0.75),
          avgPostsPerUser:
            users.length > 0
              ? Math.round((posts.length / users.length) * 10) / 10
              : 0,
          engagementRate:
            posts.length > 0
              ? Math.round((totalComments / posts.length) * 100) / 100
              : 0,
        };

        // Calculate user stats
        const userStats: UserStats[] = users.map((user: any) => {
          const userPosts = posts.filter((p: any) => p.author.id === user.id);
          let comments = 0;
          userPosts.forEach((post: any) => {
            comments += post.comments ? post.comments.length : 0;
          });

          return {
            name: user.name,
            id: user.id,
            postsCount: userPosts.length,
            commentsCount: comments,
            joinDate: '2025-01-01',
            role: user.role || 'User',
            status: userPosts.length || comments > 0 ? 'active' : 'inactive',
          };
        });

        // Calculate post analytics
        const topicMap = new Map<string, number>();
        posts.forEach((post: any) => {
          topicMap.set(post.topic, (topicMap.get(post.topic) || 0) + 1);
        });

        const topicCounts = Array.from(topicMap.entries())
          .map(([topic, count]) => ({ topic, count }))
          .sort((a, b) => b.count - a.count);

        const dateMap = new Map<string, number>();
        posts.forEach((post: any) => {
          const date = post.date || '2025-01-01';
          dateMap.set(date, (dateMap.get(date) || 0) + 1);
        });

        const postsByDate = Array.from(dateMap.entries())
          .map(([date, count]) => ({ date, count }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        const averageComments =
          posts.length > 0
            ? Math.round((totalComments / posts.length) * 100) / 100
            : 0;

        const postAnalytics: PostAnalytics = {
          topicCounts,
          postsByDate,
          averageComments,
          totalEngagement: totalComments,
        };

        this.metrics.set(metrics);
        this.userStats.set(userStats);
        this.postAnalytics.set(postAnalytics);

        return { metrics, userStats, postAnalytics };
      }),
    );
  }
}
