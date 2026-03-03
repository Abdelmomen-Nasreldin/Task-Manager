import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PAGE_ROUTES_DATA } from './shared/defines/defines';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('task-manager');
  private readonly router = inject(Router);

  pages = Object.values(PAGE_ROUTES_DATA);
  isActive(page: string) {
    if (this.router.url === '/') {
      return page === PAGE_ROUTES_DATA.DASHBOARD.path;
    }
    return this.router.url === `/${page}`;
  }
  navigateTo(page: typeof PAGE_ROUTES_DATA[keyof typeof PAGE_ROUTES_DATA]['path']) {
    this.router.navigate([page]);
  }
}
