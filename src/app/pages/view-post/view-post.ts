import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.type';

import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { HlmToaster } from '@spartan-ng/helm/sonner';

import { EditPost } from '../../components/edit-post/edit-post';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-post',
  imports: [
    BrnDialogImports,
    HlmDialogImports,
    HlmCardImports,
    HlmLabelImports,
    HlmInputImports,
    HlmButtonImports,
    RouterLink,
    ReactiveFormsModule,
    HlmToaster,
    DatePipe,
    EditPost,
  ],
  templateUrl: './view-post.html',
  styleUrl: './view-post.css',
})
export class ViewPost implements OnInit {
  postService = inject(PostService);
  router = inject(Router);
  postId = signal<string>('');

  // Use computed to reactively get the post from the service
  post = computed(() => {
    return this.postService.curPost() || this.getDefaultPost();
  });

  comment = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(4)],
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      if (postId) {
        this.postId.set(postId);

        this.postService.getOnePost(postId).subscribe({
          next: (res) => this.postService.curPost.set(res),
          error: (err) => {
            console.log(err);
            return this.postService.curPost.set(this.getDefaultPost());
          },
        });
      }
    });
  }

  private getDefaultPost(): Post {
    return {
      id: '',
      title: '',
      author: {
        name: '',
        id: '',
        role: 'User',
        access: 'Allowed',
      },
      date: new Date(),
      topic: '',
      content: '',
      featured: false,
      image: '',
      comments: [],
    };
  }

  onSubmitComment() {
    if (this.comment.invalid) {
      toast.error(
        'The comment field can neither be empty nor less than 4 word!',
      );
      return;
    }

    const date = new Date();
    const userComment = {
      id: date.getTime() as number,
      user: this.postService.user(),
      date,
      comment: this.comment.value as string,
    };

    // Update the post in the service
    const currentPost = this.post();
    const updatedPost = {
      ...currentPost,
      comments: [userComment, ...(currentPost.comments ?? [])],
    };
    // console.log('VIEW-P-112', updatedPost);

    this.postService.updatePost(updatedPost).subscribe({
      next: (res) => this.postService.curPost.set(res),
      error: (err) => {
        console.log(err);
        toast.error('Comment was not added !.. ');
        return this.postService.curPost.set(this.getDefaultPost());
      },
    });
    toast.success('Comment submitted successfully!');
    this.comment.setValue('');
  }

  onDeletePost(postId: string) {
    if (!postId) return;

    this.postService.deletePost(postId);

    this.router.navigate(['/']);
    toast.success('Post Edited  Successfully!', {
      duration: 4000,
    });
  }
}
// Great write-up, but I think the writer should have included a comparison with travelling the world without a budget.
