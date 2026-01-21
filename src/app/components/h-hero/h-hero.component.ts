import { Component, computed, inject, input } from '@angular/core';
import { Post } from '../../models/post.type';

@Component({
  selector: 'app-h-hero',
  imports: [],
  templateUrl: './h-hero.component.html',
  styleUrl: './h-hero.component.css',
})
export class HHeroComponent {
  featuredPost = input<Post>();
}
