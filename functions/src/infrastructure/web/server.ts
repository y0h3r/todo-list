import swaggerUi from 'swagger-ui-express';

import { Server } from '@configs/server';
import { FirebaseLogger } from '@shared/logger/firebase-logger.client';
import taskRouter from '@infrastructure/web/routes/tasks/router';
import userRouter from '@infrastructure/web/routes/users/router';
import swaggerSpecs from '../../../swagger';

const loggerClient = new FirebaseLogger();
const server = Server.getInstance(loggerClient);
const application = server.getApp();
application.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
application.use('/tasks', taskRouter);
application.use('/users', userRouter);
server.start();

export { server };
