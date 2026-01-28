import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { HPostComponent } from '../../components/h-post/h-post.component';

@Component({
  selector: 'app-my-posts',
  imports: [HPostComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit {
  postService = inject(PostService);
  myPosts = computed(() => {
    const posts = this.postService.fetchMyPosts(this.postService.user().id);
    return posts;
  });

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((res) => {
      if (this.postService.posts().length === 0)
        this.postService.posts.set(res);
    });
  }
}
