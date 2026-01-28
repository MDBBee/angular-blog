import { inject, Injectable, signal } from '@angular/core';
import {
  AccessStatus,
  CreatePost,
  Post,
  Role,
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
  user = signal<User>(userAdmin as User);
  topics = signal<string[]>([]);
  posts = signal<Post[]>([]);
  curPost = signal<Post | null>(null);
  URL: string = 'http://localhost:3000/blogPosts';

  fetchMyPosts(userId: string) {
    return this.posts().filter((post) => post.author.id === userId);
  }

  getAllPosts() {
    return this.http.get<Post[]>(this.URL).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      }),
    );
  }

  getOnePost(postId: string) {
    return this.http.get<Post>(this.URL + `/${postId}`).pipe(
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
    this.posts.update((prevPosts) => [newPost, ...prevPosts]);
    return;
  }

  updatePost(newPost: Post) {
    const url = this.URL + '/' + newPost.id;
    console.log(newPost);

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

    this.posts.update((prevPosts) =>
      prevPosts.filter((post) => post.id !== postId),
    );
  }
}
