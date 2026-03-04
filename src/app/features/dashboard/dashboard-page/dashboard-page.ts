import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../../core/services/task/task-service';
import { TaskFilter, TaskFilterPipe } from '../../../shared/pipes/task-filter/task-filter-pipe';
import { CommonModule } from '@angular/common';
import { TaskPriority, TaskStatus } from '../../../shared/models/task.interface';
import { User } from '../../../shared/models/user.interface';
import { TasksList } from "../components/tasks-list/tasks-list";

@Component({
  selector: 'app-dashboard-page',
  imports: [TaskFilterPipe, CommonModule, TasksList],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  private readonly taskService = inject(TaskService);
  tasks = this.taskService.tasks;
  currentFilter = signal<TaskFilter>({
    priority: null,
    assigneeName: null,
    status: null,
  });
  filteredBy = signal<string>('All');
  ngOnInit(): void {
  }


  filterTasksByPriority(priority: TaskPriority) {
    this.currentFilter.set({ priority, assigneeName: null, status: null });
    this.filteredBy.set('Priority: ' + priority);
  }

  filterTasksByStatus(status: TaskStatus) {
    this.currentFilter.set({ status, priority: null, assigneeName: null });
    this.filteredBy.set('Status: ' + status);
  }
  filterTasksByAssignee(assignee: User['name']) {
    if (assignee) {

      this.currentFilter.set({ assigneeName: assignee, priority: null, status: null });
      this.filteredBy.set('Assignee: ' + assignee);
    } else {
      this.currentFilter.set({ priority: null, assigneeName: null, status: null });
      this.filteredBy.set('All');
    }
  }


  getAllTasks() {
    this.currentFilter.set({ priority: null, assigneeName: null, status: null });
    this.filteredBy.set('All');
  }
}
