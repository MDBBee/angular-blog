import { Component, computed, inject, input } from '@angular/core';
import { NewPost } from '../../components/new-post/new-post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-new-posts',
  imports: [NewPost],
  templateUrl: './create-new-posts.component.html',
  styleUrl: './create-new-posts.component.css',
})
export class CreateNewPostsComponent {
  postService = inject(PostService);
  topics = computed(() => this.postService.topics());
}
