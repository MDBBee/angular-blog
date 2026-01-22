import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { PostService } from '../../services/post.service';
import { TitleCasePipe } from '@angular/common';

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
  ],
  templateUrl: './new-post.html',
  styleUrl: './new-post.css',
})
export class NewPost {
  postService = inject(PostService);
  topics = computed(() => this.postService.topics());
}
