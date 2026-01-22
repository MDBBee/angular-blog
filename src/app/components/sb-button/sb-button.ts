import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHome } from '@ng-icons/lucide';

@Component({
  selector: 'app-sb-button',
  imports: [NgIcon],
  templateUrl: './sb-button.html',
  styleUrl: './sb-button.css',
  providers: [provideIcons({ lucideHome })],
})
export class SbButton {
  btnName = input.required<string>();
  iconName = input.required<string>();
}
