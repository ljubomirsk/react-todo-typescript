import { Reducer } from 'redux';
import reducerWithActionMap, { ActionMap } from '../../../utils/redux-utils';
import { TodoState, Todo } from '../types/TodoState';
import { TodoActionWithPayload, TodoActionTypes } from '../../actions/todoActions';

export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
}

export enum FilterType {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
  ALL = 'ALL',
}

const initialState: TodoState = {
  todos: [],
  filter: FilterType.ALL,
};

type TodoReducer = Reducer<TodoState, TodoActionWithPayload>;

const addTodo: TodoReducer = (state, { payload }) => {
  const todoState = state as TodoState;
  const { todos } = todoState;
  const newTodoId = todos.length ? todos[todos.length - 1].id + 1 : 0;
  const newTodo: Todo = {
    id: newTodoId,
    title: payload,
    status: TodoStatus.ACTIVE,
  };

  return {
    ...todoState,
    todos: [...todos, newTodo],
  };
};

const removeTodo: TodoReducer = (state, { payload: id }) => {
  const todoState = state as TodoState;
  const { todos } = todoState;

  return {
    ...todoState,
    todos: [...todos.slice(0, id), ...todos.slice(id + 1)],
  };
};

const editTodo: TodoReducer = (state, { payload }) => {
  const todoState = state as TodoState;
  const { todos } = todoState;
  const { id, newTitle } = payload;
  const editTodo = todos.find(todo => todo.id === id) as Todo;
  editTodo.title = newTitle;

  return {
    ...todoState,
    todos: [...todos.slice(0, id), editTodo, ...todos.slice(id + 1)],
  };
};

const toggleTodoStatus: TodoReducer = (state, { payload: id }) => {
  const todoState = state as TodoState;
  const { todos } = todoState;
  const editTodo = todos.find(todo => todo.id === id) as Todo;
  editTodo.status = editTodo.status === TodoStatus.ACTIVE ? TodoStatus.COMPLETE : TodoStatus.ACTIVE;

  return {
    ...todoState,
    todos: [...todos.slice(0, id), editTodo, ...todos.slice(id + 1)],
  };
};

const markAllComplete: TodoReducer = state => {
  const todoState = state as TodoState;
  const { todos } = todoState;
  const completedTodos = todos.map(todo => {
    todo.status = TodoStatus.COMPLETE;
    return todo;
  });

  return {
    ...todoState,
    todos: completedTodos,
  };
};

const removeAll: TodoReducer = state => {
  const todoState = state as TodoState;
  const { todos } = todoState;

  return {
    ...todoState,
    todos: [],
  };
};

const setFilter: TodoReducer = (state, { payload: filter }) => {
  const todoState = state as TodoState;

  return {
    ...todoState,
    filter,
  };
};

const actionMap: ActionMap<TodoState, TodoActionWithPayload> = {
  [TodoActionTypes.ADD_TODO]: addTodo,
  [TodoActionTypes.REMOVE_TODO]: removeTodo,
  [TodoActionTypes.EDIT_TODO]: editTodo,
  [TodoActionTypes.TOGGLE_TODO_STATUS]: toggleTodoStatus,
  [TodoActionTypes.MARK_ALL_COMPLETE]: markAllComplete,
  [TodoActionTypes.REMOVE_ALL]: removeAll,
  [TodoActionTypes.SET_FILTER]: setFilter,
};

export default reducerWithActionMap(actionMap, initialState);
