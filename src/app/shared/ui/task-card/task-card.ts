import { Component, input, Input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.interface';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, DatePipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard implements OnChanges{
  task = input.required<Task>();
  isEditOrDelete = input(false);
  dueDate = signal<string>('');
  editTask = output<Task>();
  deleteTask = output<string>();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      const currentTask = changes['task'].currentValue as Task;
      this.dueDate.set(this.formatDueDateInDays(currentTask.dueDate?.toString() ?? new Date().toString()));
    }
  }

  onEditTask() {
    this.editTask.emit(this.task());
  }
  onDeleteTask() {
    this.deleteTask.emit(this.task().id);
  }
  // need to be pipe instead of in component
  private formatDueDateInDays(dueDate: string): string {
    const now = new Date();
    const target = new Date(dueDate);

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTarget = new Date(
      target.getFullYear(),
      target.getMonth(),
      target.getDate(),
    );

    const diffMs = startOfTarget.getTime() - startOfToday.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays > 0) return ` ${diffDays} day${diffDays === 1 ? '' : 's'}`;

    const overdueDays = Math.abs(diffDays);
    return `${overdueDays} day${overdueDays === 1 ? '' : 's'} `;
  }
}
