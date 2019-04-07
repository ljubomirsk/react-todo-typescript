import { Action } from 'redux';
import { ActionWithPayload } from '../../utils/redux-utils';

export enum TodoActionTypes {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  MARK_TODO_DONE = 'MARK_TODO_DONE',
  MARK_ALL_DONE = 'MARK_ALL_DONE',
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

export const editTodo = (
  id: number,
  newTitle: string
): TodoActionWithPayload<{ id: number; newTitle: string }> => ({
  type: TodoActionTypes.EDIT_TODO,
  payload: { id, newTitle },
});
