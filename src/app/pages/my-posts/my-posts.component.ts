import { Component, computed, inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { HPostComponent } from '../../components/h-post/h-post.component';

@Component({
  selector: 'app-my-posts',
  imports: [HPostComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent {
  postService = inject(PostService);
  myPosts = computed(() =>
    this.postService.fetchMyPosts(this.postService.user().id),
  );
}
