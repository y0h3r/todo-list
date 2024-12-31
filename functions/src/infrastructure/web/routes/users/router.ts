import * as admin from 'firebase-admin';
import { Router as router } from 'express';

import { FirestoreUserRepository } from '@infrastructure/firebase/firestore-user.repository';
import { UserController } from '@infrastructure/web/routes/users/controller';
import { FirestoreConnection } from '@shared/firestore';
import { FirebaseLogger } from '@shared/logger/firebase-logger.client';

if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

const userRouter = router();

const firestore = FirestoreConnection.getInstance(admin.app());
const logger = new FirebaseLogger();
const userRepository = new FirestoreUserRepository(
  firestore.getFirestore(),
  logger
);
const userController = new UserController(userRepository, logger);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 */
userRouter.post('/', (req, res) => userController.createUser(req, res));

/**
 * @swagger
 * /{email}:
 *   get:
 *     summary: Retrieve a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the user to retrieve
 */
userRouter.get('/:email', (req, res) =>
  userController.getUserByEmail(req, res)
);

export default userRouter;
