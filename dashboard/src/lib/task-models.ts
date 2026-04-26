export type TaskStatus = "not-started" | "in-progress" | "done" | "archived";
export type TaskPriority = "low" | "medium" | "high";

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

  tags?: string[];

  createdBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
