import { Action } from 'redux';
import { ActionWithPayload } from '../../utils/redux-utils';

export enum TodoActionTypes {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS',
  MARK_ALL_COMPLETE = 'MARK_ALL_COMPLETE',
  REMOVE_ALL = 'REMOVE_ALL',
}

type TodoAction = Action<TodoActionTypes>;
export type TodoActionWithPayload<P = any> = ActionWithPayload<TodoActionTypes, P>;

export const addTodo = (title: string): TodoActionWithPayload<string> => ({
  type: TodoActionTypes.ADD_TODO,
  payload: title,
});

export const removeTodo = (id: number): TodoActionWithPayload<number> => ({
  type: TodoActionTypes.REMOVE_TODO,
  payload: id,
});

export const toggleTodoStatus = (id: number): TodoActionWithPayload<number> => ({
  type: TodoActionTypes.TOGGLE_TODO_STATUS,
  payload: id,
});

export const markAllComplete = (): TodoAction => ({
  type: TodoActionTypes.MARK_ALL_COMPLETE,
});

export const removeAll = (): TodoAction => ({
  type: TodoActionTypes.REMOVE_ALL,
});

export const editTodo = (
  id: number,
  newTitle: string
): TodoActionWithPayload<{ id: number; newTitle: string }> => ({
  type: TodoActionTypes.EDIT_TODO,
  payload: { id, newTitle },
});
