import { RootState } from '../reducers/types/RootState';
import { FilterType } from '../reducers/todo/todoReducer';

export const getTodoState = (state: RootState) => state.todo;

export const getFilterType = (state: RootState) => getTodoState(state).filter;

export const getAllTodos = (state: RootState) => getTodoState(state).todos;

export const getTodosWithFilter = (state: RootState) => {
  const filter = getFilterType(state);
  return getAllTodos(state).filter(todo => filter === FilterType.ALL || todo.status === filter);
};
