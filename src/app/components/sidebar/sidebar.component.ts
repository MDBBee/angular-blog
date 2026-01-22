import { Component } from '@angular/core';
import { AdminDashboardComponent } from '../../pages/admin-dashboard/admin-dashboard.component';
import { CreateNewPostsComponent } from '../../pages/create-new-posts/create-new-posts.component';
import { HomeComponent } from '../../pages/home/home.component';
import { MyPostsComponent } from '../../pages/my-posts/my-posts.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHome } from '@ng-icons/lucide';
import { HlmDropdownMenuShortcut } from '@spartan-ng/helm/dropdown-menu';
import { SbButton } from '../sb-button/sb-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, HlmDropdownMenuShortcut, SbButton, RouterLink],
  providers: [provideIcons({ lucideHome })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
