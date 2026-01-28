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
  date: Date;
  topic: string;
  content: string;
  featured?: boolean;
  image?: string;
  comments?: Comment[];
};

export type CreatePost = Omit<Post, 'id' | 'author' | 'comments'>;
// export type UpdatePost = Omit<Post, 'id' | 'author' | 'comments'>;
export type UpdatePost = Omit<Post, 'id' | 'author'>;
