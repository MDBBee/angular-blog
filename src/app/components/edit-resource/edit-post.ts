import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPost } from '../new-post/new-post';
import { PostService } from '../../services/post.service';
import { Comment, Post } from '../../models/post.type';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideXSquare } from '@ng-icons/lucide';

@Component({
  selector: 'app-edit-post',
  imports: [CommonModule, NewPost, NgIcon],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css',
  providers: [provideIcons({ lucideXSquare })],
})
export class EditPost {
  postService = inject(PostService);
  postToEdit = input<Post>({} as Post);
  commentToEdit = input<Comment>({} as Comment);
  location = input.required<string>();

  isDialogOpen = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  deleteComment(comment: Comment, post: Post) {
    const updatedPostComment = post?.comments?.filter((com) => {
      return com.id !== comment.id;
    });
    post.comments = updatedPostComment;

    this.postService.updatePost(post).subscribe({
      next: (res) => console.log('Post updated on server:', res),
      error: (err) => console.log(err),
    });
  }
}
