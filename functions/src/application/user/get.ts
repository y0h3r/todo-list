import { User } from '@domain/entities/user';
import { FirestoreUserRepository } from '@infrastructure/firebase/firestore-user.repository';

export class GetUserByEmail {
  constructor(private readonly userRepository: FirestoreUserRepository) {}

  async execute(email: string): Promise<User | null> {
    return await this.userRepository.getByEmail(email);
  }
}
