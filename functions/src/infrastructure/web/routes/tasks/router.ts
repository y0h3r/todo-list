import * as admin from 'firebase-admin';
import { Router as router } from 'express';

import { FirestoreTaskRepository } from '@infrastructure/firebase/firestore-task.repository';
import { TaskController } from '@infrastructure/web/routes/tasks/controller';
import { FirestoreConnection } from '@shared/firestore';
import { FirebaseLogger } from '@shared/logger/firebase-logger.client';

if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */

const taskRouter = router();
const firestore = FirestoreConnection.getInstance(admin.app());
const logger = new FirebaseLogger();
const taskRepository = new FirestoreTaskRepository(
  firestore.getFirestore(),
  logger
);
const taskController = new TaskController(taskRepository, logger);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: A detailed description of the task
 */
taskRouter.post('/', (req, res) => taskController.createTask(req, res));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 */
taskRouter.get('/user/:userId', (req, res) =>
  taskController.getTasks(req, res)
);

/**
 * @swagger
 * /{taskId}:
 *   get:
 *     summary: Retrieve a single task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to retrieve
 */
taskRouter.get('/:taskId', (req, res) => taskController.getTask(req, res));

/**
 * @swagger
 * /{taskId}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the task
 *               description:
 *                 type: string
 *                 description: The updated description of the task
 */
taskRouter.put('/:taskId', (req, res) => taskController.updateTask(req, res));

/**
 * @swagger
 * /{taskId}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 */
taskRouter.delete('/:taskId', (req, res) =>
  taskController.deleteTask(req, res)
);

export default taskRouter;
