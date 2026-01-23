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

  imageLoaded = false;
  imageError = false;

  constructor() {
    // Reset image states when URL changes
    this.postForm.get('image')?.valueChanges.subscribe(() => {
      this.imageLoaded = false;
      this.imageError = false;
    });
  }

  postForm = new FormGroup({
    author: new FormControl(
      { value: this.postService.user().name, disabled: true },
      {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      },
    ),
    topic: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(50)],
    }),
    image: new FormControl(''),
    featured: new FormControl(false),
  });

  onSubmitPost() {
    if (this.postForm.invalid) {
      Object.keys(this.postForm.controls).forEach((key) => {
        const control = this.postForm.get(key);
        if (control && !control.disabled) {
          control.markAsTouched();
        }
      });

      toast.error('Validation Failed', {
        description: 'Please check the highlighted fields and try again.',
        duration: 5000,
      });

      return;
    }

    const date = new Date();
    const featured = false;
    const id = date.getTime().toString().slice(-5, -1);

    toast.success('Post Created Successfully!', {
      description: `Published on ${date.toDateString()}`,
      duration: 4000,
      action: {
        label: 'View Post',
        onClick: () => this.router.navigate(['/']),
      },
    });
  }

  onImageLoad(event: Event) {
    this.imageLoaded = true;
    this.imageError = false;
  }

  onImageError(event: Event) {
    this.imageLoaded = false;
    this.imageError = true;
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  onResetForm() {
    this.postForm.reset();
    this.imageLoaded = false;
    this.imageError = false;

    toast.warning('Form Reset', {
      description: 'All fields have been cleared',
      duration: 3000,
    });
  }
}
