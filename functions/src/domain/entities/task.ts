export interface Task {
  user?: string;
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
