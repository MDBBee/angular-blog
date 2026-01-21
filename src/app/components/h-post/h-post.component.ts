import { Component, input } from '@angular/core';
import { Post } from '../../models/post.type';

@Component({
  selector: 'app-h-post',
  imports: [],
  templateUrl: './h-post.component.html',
  styleUrl: './h-post.component.css',
})
export class HPostComponent {
  post = input.required<Post>();
}
