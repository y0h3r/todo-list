import { FirestoreTaskRepository } from '@infrastructure/firebase/firestore-task.repository';

export class DeleteTask {
  constructor(private readonly taskRepository: FirestoreTaskRepository) {}

  async execute(id: string): Promise<void> {
    return await this.taskRepository.delete(id);
  }
}
