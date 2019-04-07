import { FilterType } from '../todo/todoReducer';

export interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

export interface Todo {
  title: string;
  status: string;
  id: number;
}
