import { Firestore } from 'firebase-admin/firestore';

import { BaseRepository } from '@domain/repositories/base';
import {
  UnableToCreateTodoError,
  UnableToDeleteTodoError,
  UnableToGetTodosError,
  UnableToUpdateTodoError,
} from '@infrastructure/firebase/task-error.handler';
import { LoggerClient } from '@shared/logger/client';
import { Task } from '@domain/entities/task';

export class FirestoreTaskRepository implements BaseRepository<Task> {
  private readonly COLLECTION_NAME = 'tasks';
  private firestore: Firestore;
  private logger: LoggerClient;

  constructor(firestore: Firestore, logger: LoggerClient) {
    this.firestore = firestore;
    this.logger = logger;
  }
  getAll(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }

  async create(entity: Omit<Task, 'id'>): Promise<Task> {
    try {
      this.logger.debug(
        'FirestoreTaskRepository - create: Start with parms:',
        entity
      );
      const docCreated = await this.firestore
        .collection(this.COLLECTION_NAME)
        .add({ ...entity, createdAt: new Date() });
      this.logger.debug(
        'FirestoreTaskRepository - create: finish successfully'
      );
      return { ...entity, id: docCreated.id };
    } catch (error) {
      this.logger.error(
        'FirestoreTaskRepository - create: finish with error',
        error
      );
      throw new UnableToCreateTodoError();
    }
  }

  async getById(id: string): Promise<Task | null> {
    try {
      this.logger.debug(
        `FirestoreTaskRepository - getById: Start with id: ${id}`
      );
      const doc = await this.firestore
        .collection(this.COLLECTION_NAME)
        .doc(id)
        .get();

      if (!doc.exists) {
        this.logger.info(
          `FirestoreTaskRepository - getById: Task not found for id: ${id}`
        );
        return null;
      }

      this.logger.debug(
        'FirestoreTaskRepository - getById: Finish successfully'
      );
      return { id: doc.id, ...(doc.data() as Task) };
    } catch (error) {
      this.logger.error(
        'FirestoreTaskRepository - getById: finish with error',
        error
      );
      throw new UnableToGetTodosError();
    }
  }

  async getTasksFromUser(userId: string): Promise<Task[]> {
    try {
      this.logger.debug('FirestoreTaskRepository - getAll: Start');
      const snapshot = await this.firestore
        .collection(this.COLLECTION_NAME)
        .where('user', '==', userId)
        .get();

      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Task),
      }));

      this.logger.debug(
        'FirestoreTaskRepository - getAll: Finish successfully'
      );
      return tasks;
    } catch (error) {
      this.logger.error(
        'FirestoreTaskRepository - getAll: finish with error',
        error
      );
      throw new UnableToGetTodosError();
    }
  }

  async update(id: string, entity: Partial<Task>): Promise<void> {
    try {
      this.logger.debug(
        `FirestoreTaskRepository - update: Start with id: ${id}`
      );
      await this.firestore
        .collection(this.COLLECTION_NAME)
        .doc(id)
        .update({ ...entity, updatedAt: new Date() });

      this.logger.debug(
        'FirestoreTaskRepository - update: Finish successfully'
      );
    } catch (error) {
      this.logger.error(
        'FirestoreTaskRepository - update: finish with error',
        error
      );
      throw new UnableToUpdateTodoError();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this.logger.debug(
        `FirestoreTaskRepository - delete: Start with id: ${id}`
      );
      await this.firestore.collection(this.COLLECTION_NAME).doc(id).delete();

      this.logger.debug(
        'FirestoreTaskRepository - delete: Finish successfully'
      );
    } catch (error) {
      this.logger.error(
        'FirestoreTaskRepository - delete: finish with error',
        error
      );
      throw new UnableToDeleteTodoError();
    }
  }
}
