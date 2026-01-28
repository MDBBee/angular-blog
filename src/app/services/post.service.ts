import { inject, Injectable, signal } from '@angular/core';
import {
  AccessStatus,
  CreatePost,
  Post,
  Role,
  Topic,
  User,
} from '../models/post.type';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

const userTest = {
  name: 'Maria Rodrigueze',
  id: '8921bnbnds',
  role: 'User',
  access: 'Allowed',
};
const userAdmin = {
  name: 'John Smith',
  id: 'jkjhhj6767',
  role: 'Admin',
  access: 'Allowed',
};
@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);
  user = signal<User>(userTest as User);
  topics = signal<Topic[]>([]);
  posts = signal<Post[]>([]);
  curPost = signal<Post | null>(null);
  URLPOSTS: string = 'http://localhost:3000/blogPosts';
  URLUSERS: string = 'http://localhost:3000/users';
  URLTOPICS: string = 'http://localhost:3000/topics';

  fetchMyPosts(userId: string) {
    return this.posts().filter((post) => post.author.id === userId);
  }

  getAllPosts() {
    return this.http.get<Post[]>(this.URLPOSTS).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      }),
    );
  }

  getAllTopics() {
    return this.http.get<Topic[]>(this.URLTOPICS).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      }),
    );
  }

  getOnePost(postId: string) {
    return this.http.get<Post>(this.URLPOSTS + `/${postId}`).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      }),
    );
  }

  createPost(post: CreatePost) {
    const author = this.user();

    const date = new Date();
    const id = date.getTime().toString();
    const newPost = { ...post, author, id };

    return this.http.post<Post>(this.URLPOSTS, newPost).pipe(
      tap({
        next: (addedPost) =>
          this.posts.update((prevPosts) => [addedPost, ...prevPosts]),
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      }),
    );
  }

  updatePost(newPost: Post) {
    const url = this.URLPOSTS + '/' + newPost.id;
    // const date = new Date();
    // console.log(date.toLocaleDateString());
    // console.log(date.toDateString());
    // console.log(date.toString());
    // console.log(date.toLocaleString());
    // console.log(date.toTimeString());
    // console.log(date.toJSON());
    // console.log(date.toISOString());
    // console.log(date.toUTCString());
    // console.log(date);

    return this.http.put<Post>(url, newPost).pipe(
      tap({
        next: (updatedPost) => {
          this.posts.update((prevPosts) =>
            prevPosts.map((post) => {
              return post.id === newPost.id ? updatedPost : post;
            }),
          );

          this.curPost.set(updatedPost);
        },
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      }),
    );
  }

  deletePost(postId: string) {
    // console.log('UPDATE post', newPost);

    return this.http.delete(this.URLPOSTS + '/' + postId).pipe(
      tap({
        next: () => {
          this.posts.update((prevP) => prevP.filter((p) => p.id !== postId));

          if (this.curPost()?.id === postId) this.curPost.set(null);
        },
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      }),
    );
  }
}
