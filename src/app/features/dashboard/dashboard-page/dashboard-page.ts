import { Component, inject, OnInit, signal } from '@angular/core';
import { Task } from '../../../shared/models/task.interface';
import { TaskService } from '../../../core/services/task/task-service';
import { TaskCard } from "../../../shared/ui/task-card/task-card";

@Component({
  selector: 'app-dashboard-page',
  imports: [TaskCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  private readonly taskService = inject(TaskService);
  tasks = this.taskService.tasks;

  ngOnInit(): void {
  }
}
