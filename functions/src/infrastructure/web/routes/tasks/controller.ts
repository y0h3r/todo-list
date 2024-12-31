import { Request, Response } from 'express';

import { CreateTask } from '@application/task/create';
import { FirestoreTaskRepository } from '@infrastructure/firebase/firestore-task.repository';
import { LoggerClient } from '@shared/logger/client';
import { GetTask, GetTasks } from '@application/task/get';
import { UpdateTask } from '@application/task/update';
import { DeleteTask } from '@application/task/delete';

export class TaskController {
  private taskRepository: FirestoreTaskRepository;
  private logger: LoggerClient;

  constructor(taskRepository: FirestoreTaskRepository, logger: LoggerClient) {
    this.taskRepository = taskRepository;
    this.logger = logger;
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const createTask = new CreateTask(this.taskRepository);
      const task = await createTask.execute({
        title,
        description,
        completed: false,
      });
      res.status(201).json(task);
    } catch (error) {
      this.logger.error('');
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, user, completed } = req.body;
      const { id: taskId } = req.params;

      const getTask = new UpdateTask(this.taskRepository);
      const task = await getTask.execute(taskId, {
        id: taskId,
        title,
        description,
        user,
        completed,
      });

      res.status(201).json(task);
    } catch (error) {
      console.error('Error getting task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getTask(req: Request, res: Response): Promise<void> {
    try {
      const { taskId: id } = req.params;
      const getTask = new GetTask(this.taskRepository);
      const task = await getTask.execute(id);

      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.status(200).json(task);
    } catch (error) {
      console.error('Error getting task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const getTask = new GetTasks(this.taskRepository);
      const task = await getTask.execute();

      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.status(200).json(task);
    } catch (error) {
      console.error('Error getting task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { taskId: id } = req.params;
      const getTask = new DeleteTask(this.taskRepository);
      const task = await getTask.execute(id);

      res.status(200).json(task);
    } catch (error) {
      console.error('Error getting task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
