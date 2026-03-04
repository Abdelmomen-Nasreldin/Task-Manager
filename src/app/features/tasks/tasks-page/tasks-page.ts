import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../../../core/services/task/task-service';
import { TaskCard } from "../../../shared/ui/task-card/task-card";
import { Task } from '../../../shared/models/task.interface';
import { Modal } from "../../../shared/ui/modal/modal";
import { NotifyService } from '../../../core/services/notify/notify-service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user/user-service';

@Component({
  selector: 'app-tasks-page',
  imports: [TaskCard, Modal, CommonModule],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
})
export class TasksPage {
  private readonly notifyService = inject(NotifyService);
  private readonly taskService = inject(TaskService);
  tasks = this.taskService.tasks;
  isModalOpen = signal<boolean>(false);
  updatedTask = signal<Task | null>(null);

  readonly userService = inject(UserService);
  users = this.userService.users;
  
  openModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }
  onEditClick(task: Task) {
    this.updatedTask.set(task);
    this.openModal();
  }
  onDeleteClick(id: string) {
    console.log('onDeleteTask', id);
    this.deleteTask(id);
  }

  deleteTask(id: string) {
    this.notifyService.showConfirmAlert('warning').then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe({
          next: (deletedTask) => {
            this.notifyService.showSuccessAlert();
            this.closeModal();
          },
          error: (error) => {
            this.notifyService.showErrorAlert(error);
            this.closeModal();
          }
        });
      }
    });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: (updatedTask) => {
        this.notifyService.showSuccessAlert();
        this.closeModal();
      },
      error: (error) => {
        this.notifyService.showErrorAlert(error);
        this.closeModal();
      }
    });
  }
}
