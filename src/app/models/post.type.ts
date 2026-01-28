export type Comment = {
  id: number;
  user: {
    name: string;
    id: string;
  };
  date: Date;
  comment: string;
};

export type Role = 'Admin' | 'User';
export type AccessStatus = 'Blocked' | 'Allowed';
export type User = {
  name: string;
  id: string;
  role: Role;
  access: AccessStatus;
};
export type Topic = { id: string; name: string };

export type Post = {
  id: string;
  title: string;
  author: User;
  date: string;
  topic: string;
  content: string;
  featured?: boolean;
  image?: string;
  comments?: Comment[];
};

export type CreatePost = Omit<Post, 'id' | 'author' | 'comments'>;
// export type UpdatePost = Omit<Post, 'id' | 'author' | 'comments'>;
export type UpdatePost = Omit<Post, 'id' | 'author'>;

export interface DashboardMetrics {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  activeUsers: number;
  avgPostsPerUser: number;
  engagementRate: number;
}

export interface UserStats {
  name: string;
  id: string;
  postsCount: number;
  commentsCount: number;
  joinDate: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface PostAnalytics {
  topicCounts: { topic: string; count: number }[];
  postsByDate: { date: string; count: number }[];
  averageComments: number;
  totalEngagement: number;
}
