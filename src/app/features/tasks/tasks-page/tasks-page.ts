import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../../../core/services/task/task-service';
import { TaskCard } from "../../../shared/ui/task-card/task-card";
import { Task } from '../../../shared/models/task.interface';
import { Modal } from "../../../shared/ui/modal/modal";

@Component({
  selector: 'app-tasks-page',
  imports: [TaskCard, Modal],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
})
export class TasksPage {
  private readonly taskService = inject(TaskService);
  tasks = this.taskService.tasks;
  isModalOpen = signal<boolean>(false);
  updatedTask = signal<Task | null>(null);
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
    this.taskService.deleteTask(id).subscribe({
      next: (deletedTask) => {
        console.log('Task deleted successfully', deletedTask);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error deleting task', error);
        this.closeModal();
        alert('Error deleting task');
      }
    });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: (updatedTask) => {
        console.log('Task updated successfully', updatedTask);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error updating task', error);
        this.closeModal();
        alert('Error updating task');
      }
    });
  }
}
