import { Pipe, PipeTransform } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../models/task.interface';
import { User } from '../../models/user.interface';

export interface TaskFilter {
  priority?: TaskPriority | null;
  status?: TaskStatus | null;
  assigneeId?: User['id'] | null;
}

@Pipe({
  name: 'taskFilter',
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[] , filter: TaskFilter | null): Task[] {
    if (!filter) {
      return tasks;
    }

    return tasks.filter(task => {

      if (filter.priority && task.priority.toLowerCase() !== filter.priority.toLowerCase()) {
        return false;
      }

      if (filter.status && task.status !== filter.status) {
        return false;
      }

      if (filter.assigneeId && task.assignee?.id !== filter.assigneeId) {
        return false;
      }

      return true;
    });
  }
}
