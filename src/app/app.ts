import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PAGE_ROUTES_DATA } from './shared/defines/defines';
import { CommonModule } from '@angular/common';
import { Modal } from './shared/ui/modal/modal';
import { Task } from './shared/models/task.interface';
import { TaskService } from './core/services/task/task-service';
import { NotifyService } from './core/services/notify/notify-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, Modal],
templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('task-manager');
  private readonly router = inject(Router);
  private readonly tasksService = inject(TaskService);
  private readonly notifyService = inject(NotifyService);
  pages = Object.values(PAGE_ROUTES_DATA);

  isModalOpen = signal(false);
  openModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }
  saveModal(task: Task) {
    console.log('saveModal', task);
    this.tasksService.createTask(task).subscribe({
      next: () => {
        this.notifyService.showSuccessAlert();
        this.closeModal();
      },
      error: (error) => {
        this.notifyService.showErrorAlert(error);
        this.closeModal();
      }
    });
  }

  isActive(page: string) {
    if (this.router.url === '/') {
      return page === PAGE_ROUTES_DATA.DASHBOARD.path;
    }
    return this.router.url === `/${page}`;
  }
  navigateTo(page: (typeof PAGE_ROUTES_DATA)[keyof typeof PAGE_ROUTES_DATA]['path']) {
    this.router.navigate([page]);
  }

}
