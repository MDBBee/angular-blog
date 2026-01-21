import { Component, computed, inject } from '@angular/core';
import { HHeroComponent } from '../../components/h-hero/h-hero.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.type';
import { DatePipe } from '@angular/common';
import { HPostComponent } from '../../components/h-post/h-post.component';

@Component({
  selector: 'app-home',
  imports: [HHeroComponent, DatePipe, HPostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  postService = inject(PostService);
  posts = computed(() => this.postService.posts());
  featuredPost = computed(() =>
    this.postService.posts().find((p) => p.featured),
  );
}
