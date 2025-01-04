import { Task } from '@domain/entities/task';
import { FirestoreTaskRepository } from '@infrastructure/firebase/firestore-task.repository';

export class GetTasks {
  constructor(private readonly taskRepository: FirestoreTaskRepository) {}

  async execute(userId: string): Promise<Task[]> {
    return await this.taskRepository.getTasksFromUser(userId);
  }
}

export class GetTask {
  constructor(private readonly taskRepository: FirestoreTaskRepository) {}

  async execute(id: string): Promise<Task | null> {
    return await this.taskRepository.getById(id);
  }
}
