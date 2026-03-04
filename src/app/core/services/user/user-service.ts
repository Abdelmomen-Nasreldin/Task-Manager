import { Injectable, signal } from '@angular/core';
import { User } from '../../../shared/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersSignal = signal<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://via.placeholder.com/150',
      updatedAt: new Date().toISOString(),
      assignedTasks: [],
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      avatar: 'https://via.placeholder.com/150',
      updatedAt: new Date().toISOString(),
      assignedTasks: [],
    },
    {
      id: '3',
      name: 'Jim Doe',
      email: 'jim.doe@example.com',
      avatar: 'https://via.placeholder.com/150',
      updatedAt: new Date().toISOString(),
      assignedTasks: [],
    },
    {
      id: '4',
      name: 'Jill Doe',
      email: 'jill.doe@example.com',
      avatar: 'https://via.placeholder.com/150',
      updatedAt: new Date().toISOString(),
      assignedTasks: [],
    },
    {
      id: '5',
      name: 'Jack Doe',
      email: 'jack.doe@example.com',
      avatar: 'https://via.placeholder.com/150',
      updatedAt: new Date().toISOString(),
      assignedTasks: [],
    },
    {
      id: '6',
      name: 'Jill Doe',
      email: 'jill.doe@example.com',
      avatar: 'https://via.placeholder.com/150',
      updatedAt: new Date().toISOString(),
      assignedTasks: [],
    },
  ]);
  public users = this.usersSignal.asReadonly();
}


