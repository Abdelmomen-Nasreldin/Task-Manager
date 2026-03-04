import { Pipe, PipeTransform } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../models/task.interface';
import { User } from '../../models/user.interface';

export interface TaskFilter {
  priority?: TaskPriority | null;
  status?: TaskStatus | null;
  assigneeName?: User['name'] | null;
  title?: Task['title'] | null;
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

      if (filter.assigneeName && task.assignee?.name?.toLowerCase().includes(filter.assigneeName.toLowerCase()) !== true) {
        return false;
      }

      if (filter.title && task.title.toLowerCase().includes(filter.title.toLowerCase()) !== true) {
        return false;
      }

      return true;
    });
  }
}
