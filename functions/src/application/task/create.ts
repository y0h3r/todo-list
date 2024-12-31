import { Task } from '@domain/entities/task';
import { FirestoreTaskRepository } from '@infrastructure/firebase/firestore-task.repository';

export class CreateTask {
  constructor(private readonly taskRepository: FirestoreTaskRepository) {}

  async execute(task: Omit<Task, 'id'>): Promise<Task> {
    return await this.taskRepository.create(task);
  }
}
