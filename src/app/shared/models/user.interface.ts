import { Task } from "./task.interface";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  updatedAt?: string;
  assignedTasks?: Task[];
}
