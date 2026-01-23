import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { PostService } from '../../services/post.service';
import { TitleCasePipe } from '@angular/common';
import { Post, CreatePost } from '../../models/post.type';
import { HlmToaster, HlmToasterImports } from '@spartan-ng/helm/sonner';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { FormFieldError } from '../form-field-error/form-field-error';

@Component({
  selector: 'app-new-post',
  imports: [
    HlmCheckboxImports,
    HlmTextareaImports,
    HlmButtonImports,
    HlmInputImports,
    HlmFieldImports,
    BrnSelectImports,
    HlmSelectImports,
    ReactiveFormsModule,
    TitleCasePipe,
    ReactiveFormsModule,
    HlmToaster,
    HlmToasterImports,
    FormFieldError,
  ],
  templateUrl: './new-post.html',
  styleUrl: './new-post.css',
})
export class NewPost {
  postService = inject(PostService);
  router = inject(Router);
  topics = computed(() => this.postService.topics());

  postForm = new FormGroup({
    author: new FormControl(this.postService.user().name, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    topic: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(50)],
    }),
    image: new FormControl(''),
    featured: new FormControl(false),
  });

  submitPost() {
    const date = new Date();
    const featured = false;
    const id = date.getTime().toString().slice(-5, -1);

    toast('Post submitted successfully', {
      description: `${date.toDateString()}`,
      action: {
        label: 'Go To "Home Page"',
        onClick: () => this.router.navigate(['/']),
      },
    });
  }

  failedToast() {
    this.postForm.reset();
    toast('Post has been Reset!', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => this.postForm.reset(),
      },
    });
  }
}
