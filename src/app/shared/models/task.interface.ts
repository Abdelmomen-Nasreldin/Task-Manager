import { User } from "./user.interface";

export interface Task {
  id: string;
  title: string; /// required
  description: string; /// required
  status: TaskStatus; /// required
  priority: TaskPriority; /// required
  dueDate: string; /// required
  isOverdue: boolean;
  completedAt?: string;
  assignee: Pick<User, "id" | "name" | "email" | "avatar"> | null; /// required
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface TasksResponse {
  tasks: Task[];
  meta: {
    totalCount: number;
    lastUpdated: string;
  };
}

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "high" | "medium" | "low";


