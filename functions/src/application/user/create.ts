import { User } from '@domain/entities/user';
import { FirestoreUserRepository } from '@infrastructure/firebase/firestore-user.repository';

export class CreateUser {
  constructor(private readonly userRepository: FirestoreUserRepository) {}

  async execute(user: Omit<User, 'id'>): Promise<User> {
    return await this.userRepository.create(user);
  }
}
