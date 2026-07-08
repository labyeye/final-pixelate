export type TaskStatus =
  | "not-started"
  | "in-progress"
  | "done"
  | "issues"
  | "completed"
  | "archived";
export type TaskPriority = "low" | "medium" | "high";

export interface TaskUpdate {
  id: string;
  status: TaskStatus;
  remark?: string;
  completedLink?: string;
  byId?: string | null;
  byName?: string | null;
  at: string | Date;
}

export interface Task {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;

  projectId?: string;
  projectTitle?: string;

  assigneeId?: string;
  assigneeName?: string;
  assigneeAvatar?: string;

  dueDate?: string | Date;

  assetLink?: string;
  completedLink?: string;
  updates?: TaskUpdate[];

  tags?: string[];

  createdBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
