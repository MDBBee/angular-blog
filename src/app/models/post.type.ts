export type Comment = {
  id: number;
  user: {
    name: string;
    id: string;
  };
  date: Date;
  comment: string;
};

export type Post = {
  id: string;
  title: string;
  author: {
    name: string;
    id: string;
  };
  date: Date;
  topic: string;
  content: string;
  featured?: boolean;
  image?: string; // Optional field for images
  comments?: Comment[]; // Optional field for comments
};

// export type CreatePost = {
//   title: string;
//   topic: string;
//   content: string;
//   featured?: boolean;
//   image?: string; // Optional field for images
// };
export type CreatePost = Omit<Post, 'id' | 'author' | 'comments'>;
export type UpdatePost = Omit<Post, 'id' | 'author' | 'comments'>;
