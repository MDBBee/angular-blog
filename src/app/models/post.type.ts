export type Comment = {
  id: number;
  name: string;
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
