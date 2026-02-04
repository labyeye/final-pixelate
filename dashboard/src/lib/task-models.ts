export type TaskStatus = "not-started" | "in-progress" | "done" | "archived";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  _id?: string;
  id?: string; // frontend convenience
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;

  // References
  projectId?: string;
  projectTitle?: string; // Cached for display, optional

  assigneeId?: string; // User ID
  assigneeName?: string; // Cached for display
  assigneeAvatar?: string; // Cached

  dueDate?: string | Date;

  tags?: string[];

  createdBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
