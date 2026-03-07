import { computed, inject, Injectable } from '@angular/core';
import { User } from '../../../shared/models/user.interface';
import { TaskService } from '../task/task-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly taskService = inject(TaskService);

  public users = computed<User[]>(() => {
    const usersById = new Map<string, User>();

    this.taskService.tasks().forEach((task) => {
      if (!task.assignee) return;

      const existingUser = usersById.get(task.assignee.id);
      if (existingUser) {
        existingUser.assignedTasks = [...(existingUser.assignedTasks ?? []), task];
        return;
      }

      usersById.set(task.assignee.id, {
        id: task.assignee.id,
        name: task.assignee.name,
        email: task.assignee.email,
        avatar: task.assignee.avatar,
        assignedTasks: [task],
        updatedAt: new Date().toISOString(),
      });
    });

    return Array.from(usersById.values());
  });
}


