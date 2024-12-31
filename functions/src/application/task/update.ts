import { Task } from '@domain/entities/task';
import { FirestoreTaskRepository } from '@infrastructure/firebase/firestore-task.repository';

export class UpdateTask {
  constructor(private readonly taskRepository: FirestoreTaskRepository) {}

  async execute(id: string, task: Partial<Task>): Promise<void> {
    return await this.taskRepository.update(id, task);
  }
}
