import { Component, computed, inject, OnInit } from '@angular/core';
import { HHeroComponent } from '../../components/h-hero/h-hero.component';
import { PostService } from '../../services/post.service';

import { HPostComponent } from '../../components/h-post/h-post.component';

@Component({
  selector: 'app-home',
  imports: [HHeroComponent, HPostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  postService = inject(PostService);
  posts = computed(() => this.postService.posts());
  featuredPost = computed(
    () =>
      this.postService.posts().find((p) => p.featured) ||
      this.postService.posts()[0],
  );

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((res) => {
      this.postService.posts.set(res);
    });

    this.postService.getAllTopics().subscribe((res) => {
      this.postService.topics.set(res);
    });
  }
}
