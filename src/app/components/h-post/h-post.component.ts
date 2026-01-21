import { Component, input } from '@angular/core';
import { Post } from '../../models/post.type';
import { NameInitialsPipe } from '../../pipes/name-initials.pipe';

import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-h-post',
  imports: [NameInitialsPipe],
  templateUrl: './h-post.component.html',
  styleUrl: './h-post.component.css',
})
export class HPostComponent {
  post = input.required<Post>();
}
