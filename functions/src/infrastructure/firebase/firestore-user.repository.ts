import { Firestore } from 'firebase-admin/firestore';

import { BaseRepository } from '@domain/repositories/base';
import {
  UnableToGetUserError,
  UnableToCreateUserError,
} from '@infrastructure/firebase/user-error.handler';
import { LoggerClient } from '@shared/logger/client';
import { User } from '@domain/entities/user';

export class FirestoreUserRepository implements BaseRepository<User> {
  private readonly COLLECTION_NAME = 'users';
  private firestore: Firestore;
  private logger: LoggerClient;

  constructor(firestore: Firestore, logger: LoggerClient) {
    this.firestore = firestore;
    this.logger = logger;
  }

  async create(entity: Omit<User, 'id'>): Promise<User> {
    try {
      this.logger.debug(
        'FirestoreUserRepository - create: Start with parms:',
        entity
      );
      const docCreated = await this.firestore
        .collection(this.COLLECTION_NAME)
        .add({ ...entity, createdAt: new Date() });
      this.logger.debug(
        'FirestoreUserRepository - create: finish successfully'
      );
      return { ...entity, id: docCreated.id };
    } catch (error) {
      this.logger.error(
        'FirestoreUserRepository - create: finish with error',
        error
      );
      throw new UnableToCreateUserError();
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      this.logger.debug(
        `FirestoreUserRepository - getByEmail: Start with id: ${email}`
      );
      const doc = await this.firestore
        .collection(this.COLLECTION_NAME)
        .doc(email)
        .get();

      if (!doc.exists) {
        this.logger.info(
          `FirestoreUserRepository - getByEmail: User not found for id: ${email}`
        );
        return null;
      }

      this.logger.debug(
        'FirestoreUserRepository - getByEmail: Finish successfully'
      );
      return { ...(doc.data() as User) };
    } catch (error) {
      this.logger.error(
        'FirestoreUserRepository - getByEmail: finish with error',
        error
      );
      throw new UnableToGetUserError();
    }
  }

  getById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: Partial<User>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
