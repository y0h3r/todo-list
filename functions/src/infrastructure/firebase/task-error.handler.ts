import { TodoError } from '@shared/error/todo.handler';

export class TodoNotFoundError extends TodoError {
  constructor(message = 'Todo not found') {
    super(message, 404);
  }
}

export class UnableToCreateTodoError extends TodoError {
  constructor(message = 'Unable to create todo') {
    super(message, 500);
  }
}

export class UnableToUpdateTodoError extends TodoError {
  constructor(message = 'Unable to update todo') {
    super(message, 500);
  }
}

export class UnableToDeleteTodoError extends TodoError {
  constructor(message = 'Unable to delete todo') {
    super(message, 500);
  }
}

export class UnableToGetTodosError extends TodoError {
  constructor(message = 'Unable to get todos') {
    super(message, 500);
  }
}

export class UnknowTodoError extends TodoError {
  constructor(message = 'Unknow todo error') {
    super(message, 500);
  }
}
