import { TodoState } from './TodoState';

export interface RootState {
  readonly todo: Readonly<TodoState>;
}
