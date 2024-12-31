import { TodoError } from '@shared/error/todo.handler';

export class UnableToCreateUserError extends TodoError {
  constructor(message = 'Unable to create user') {
    super(message, 500);
  }
}

export class UnableToGetUserError extends TodoError {
  constructor(message = 'Unable to get user') {
    super(message, 500);
  }
}

export class UnknowTodoError extends TodoError {
  constructor(message = 'Unknow todo error') {
    super(message, 500);
  }
}
