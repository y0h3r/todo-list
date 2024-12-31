import { Request, Response } from 'express';

import { FirestoreUserRepository } from '@infrastructure/firebase/firestore-user.repository';
import { LoggerClient } from '@shared/logger/client';
import { CreateUser } from '@application/user/create';
import { GetUserByEmail } from '@application/user/get';

export class UserController {
  private userRepository: FirestoreUserRepository;
  private logger: LoggerClient;

  constructor(userRepository: FirestoreUserRepository, logger: LoggerClient) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const createUser = new CreateUser(this.userRepository);
      const userCreated = await createUser.execute({
        email,
      });
      res.status(201).json(userCreated);
    } catch (error) {
      this.logger.error('');
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const getUserByEmail = new GetUserByEmail(this.userRepository);
      const user = await getUserByEmail.execute(email);

      if (!user) {
        res.status(404).json({ message: 'user not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
