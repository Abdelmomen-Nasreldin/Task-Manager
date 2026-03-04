import { Component, input } from '@angular/core';
import { Task } from '../../../../shared/models/task.interface';
import { TaskCard } from "../../../../shared/ui/task-card/task-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule, TaskCard],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {
  tasks = input.required<Task[]>();
  currentFilter = input<string>('All');
}
