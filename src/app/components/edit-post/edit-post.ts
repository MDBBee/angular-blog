import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPost } from '../new-post/new-post';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.type';

@Component({
  selector: 'app-edit-post',
  imports: [CommonModule, NewPost],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css',
})
export class EditPost {
  postService = inject(PostService);
  // post = computed(() => this.postService.getOnePost(this.postId()));
  postToEdit = input.required<Post>();

  isDialogOpen = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
