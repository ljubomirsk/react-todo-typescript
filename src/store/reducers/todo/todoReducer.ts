import { Reducer } from 'redux';
import reducerWithActionMap, { ActionMap } from '../../../utils/redux-utils';
import { TodoState, Todo } from '../types/TodoState';
import { TodoActionWithPayload, TodoActionTypes } from '../../actions/todoActions';

const initialState: TodoState = {
  todos: [],
};

export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
}

type TodoReducer = Reducer<TodoState, TodoActionWithPayload>;

const addTodo: TodoReducer = (state, { payload }) => {
  const { todos } = state as TodoState;
  const newTodoId = todos.length ? todos[todos.length - 1].id + 1 : 0;
  const newTodo: Todo = {
    id: newTodoId,
    title: payload,
    status: TodoStatus.ACTIVE,
  };

  return {
    ...state,
    todos: [...todos, newTodo],
  };
};

const removeTodo: TodoReducer = (state, { payload: id }) => {
  const { todos } = state as TodoState;

  return {
    ...state,
    todos: [...todos.slice(0, id), ...todos.slice(id + 1)],
  };
};

const editTodo: TodoReducer = (state, { payload }) => {
  const { todos } = state as TodoState;
  const { id, newTitle } = payload;
  const editTodo = todos.find(todo => todo.id === id) as Todo;
  editTodo.title = newTitle;

  return {
    ...state,
    todos: [...todos.slice(0, id), editTodo, ...todos.slice(id + 1)],
  };
};

const actionMap: ActionMap<TodoState, TodoActionWithPayload> = {
  [TodoActionTypes.ADD_TODO]: addTodo,
  [TodoActionTypes.REMOVE_TODO]: removeTodo,
  [TodoActionTypes.EDIT_TODO]: editTodo,
};

export default reducerWithActionMap(actionMap, initialState);
