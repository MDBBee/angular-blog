import { Component, computed, inject, input } from '@angular/core';
import { Post } from '../../models/post.type';
import { NameInitialsPipe } from '../../pipes/name-initials.pipe';

@Component({
  selector: 'app-h-hero',
  imports: [NameInitialsPipe],
  templateUrl: './h-hero.component.html',
  styleUrl: './h-hero.component.css',
})
export class HHeroComponent {
  featuredPost = input.required<Post>();
}
