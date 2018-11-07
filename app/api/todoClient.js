import {callApi} from './common';

const todoApi = "/td";

export function getCurrentUserTodos() {
  return callApi({url: `${todoApi}/api/todos`});
}

export function getTodoDetail(todoId) {
  return callApi({ url: `${todoApi}/api/todos/${todoId}` });
}

export function createTodo(todoRequest) {
  const newTodo = {
    title: todoRequest.title,
    description: todoRequest.description,
    priority: todoRequest.priority,
    timeNeededInMin: todoRequest.timeNeededInMin,
  };
  return callApi({
    url: `${todoApi}/api/todos/`,
    method: 'POST',
    body: newTodo
  });
}
