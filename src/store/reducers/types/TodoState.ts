export interface TodoState {
  todos: Todo[];
}

export interface Todo {
  title: string;
  status: string;
  id: number;
}
