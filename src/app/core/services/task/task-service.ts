import { computed, inject, Injectable, signal } from '@angular/core';
import { Task, TasksResponse } from '../../../shared/models/task.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/assets/data';

  private readonly cachedTasks = signal<TasksResponse | null>(null);
  public resetCachedTasks() {
    this.cachedTasks.set(null);
  }
  private readonly tasksDataSignal = signal<TasksResponse | null>(null);
  public tasksData = this.tasksDataSignal.asReadonly();
  public tasks = computed(() => this.tasksData()?.tasks ?? []);
  public tasksLength = computed(() => this.tasksData()?.meta.totalCount ?? 0);
  public tasksLastUpdated = computed(() => this.tasksData()?.meta.lastUpdated ?? '');

  constructor() {
    this.getTasks()
      .pipe(take(1))
      .subscribe((tasksData: TasksResponse) => {
        console.log('tasksData', tasksData);
      });
  }

  private getTasks() {
    return this.http
      .get<TasksResponse>(`${this.baseUrl}/tasks.json`)
      .pipe(tap((tasksData) => this.tasksDataSignal.set(tasksData)));
  }

  createTask(newTask: Task) {
    console.log('creating task');
    this.tasksDataSignal.update((prev) =>
      prev
        ? {
            ...prev,
            tasks: [newTask, ...prev.tasks],
            meta: {
              totalCount: prev.meta.totalCount + 1,
              lastUpdated: new Date().toISOString(),
            },
          }
        : {
            tasks: [newTask],
            meta: {
              totalCount: 1,
              lastUpdated: new Date().toISOString(),
            },
          },
    );
    return of(newTask);
  }

  updateTask(updatedTask: Task) {
    this.tasksDataSignal.update((prev) =>
      prev
        ? {
            ...prev,
            tasks: prev.tasks.map((t) => t.id === updatedTask.id ? updatedTask : t),
            meta: {
              totalCount: prev.meta.totalCount,
              lastUpdated: new Date().toISOString(),
            },
          }
        : {
            tasks: [updatedTask],
            meta: {
              totalCount: 1,
              lastUpdated: new Date().toISOString(),
            },
          },
    );
    return of(updatedTask);
  }

  deleteTask(taskId: string) {
    this.tasksDataSignal.update((prev) =>
      prev
        ? {
            ...prev,
            tasks: prev.tasks.filter((t) => t.id !== taskId),
            meta: {
              totalCount: prev.meta.totalCount - 1,
              lastUpdated: new Date().toISOString(),
            },
          }
        : prev,
    );
    return of(taskId);
  }
}
