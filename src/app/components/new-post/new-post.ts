import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
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
import { CreatePost, Post, UpdatePost } from '../../models/post.type';

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
  authorName = computed(() => this.postService.user().name);

  // Output event to notify parent component when post is submitted
  postSubmitted = output<void>();

  imageLoaded = false;
  imageError = false;

  constructor() {
    // Reset image states when URL changes
    this.postForm.get('image')?.valueChanges.subscribe(() => {
      this.imageLoaded = false;
      this.imageError = false;
    });
  }

  // Should this component be used in the edit page
  // For Debugging: postToedit was passed from view-post --> edit-post --> new-post 😊
  isUpdate = input<boolean>(false);
  postToEdit = input<Post>({
    id: '',
    title: '',
    author: { name: '', id: '', role: 'User', access: 'Allowed' },
    date: new Date().toLocaleDateString(),
    topic: '',
    content: '',
    featured: false,
    image: '',
    comments: [],
  });

  updatePost = effect(() => {
    this.postForm.patchValue(this.postToEdit());
  });

  postForm = new FormGroup({
    author: new FormControl(
      { value: this.postService.user(), disabled: true },
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

  get formValue() {
    const { author, ...formData } = this.postForm.value;
    return formData;
  }

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

    // Run code if updating an existing post
    if (this.isUpdate()) {
      const post = {
        ...this.postToEdit(),
        ...this.postForm.getRawValue(),
      } as Post;

      this.postService.updatePost(post).subscribe({
        next: () => {
          toast.success('Post Updated  Successfully!', {
            duration: 4000,
          });
          this.postSubmitted.emit();
        },
        error: (err) => console.log(err),
      });
      // console.log('Clicked!!!!!!!!!!', this.isUpdate(), post);

      return;
    }
    // Run code if creating a new post
    const date = new Date().toLocaleDateString();
    const newPost = {
      ...this.formValue,
      date,
    } as Post;

    this.postService.createPost(newPost).subscribe({
      next: (post) => {
        toast.success('Post Created  Successfully!', {
          description: `Published on ${date}`,
          duration: 4000,
          action: {
            label: 'View Post',
            onClick: () => this.router.navigate(['/']),
          },
        });
      },
      error: (err) => console.log(err),
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
