import cloneDeep from 'lodash/cloneDeep';
import { TodoState, Todo } from '../types/TodoState';
import todoReducer, { TodoStatus, FilterType } from './todoReducer';
import {
  addTodo,
  removeTodo,
  editTodo,
  toggleTodoStatus,
  markAllComplete,
  removeAll,
  setFilter,
} from '../../actions/todoActions';

const mockState: TodoState = {
  todos: [
    {
      id: 0,
      title: 'Test todo 1',
      status: TodoStatus.ACTIVE,
    },
    {
      id: 1,
      title: 'Test todo 2',
      status: TodoStatus.ACTIVE,
    },
  ],
  filter: FilterType.ALL,
};

describe('TodoReducer', () => {
  it('should add a new todo if list is empty and set id to 0', () => {
    const todoTitle = 'New Todo';

    const newState = todoReducer({ todos: [], filter: FilterType.ALL }, addTodo(todoTitle));

    expect(newState.todos.length).toBe(1);

    const [first] = newState.todos;
    expect(first.id).toBe(0);
    expect(first.title).toEqual(todoTitle);
    expect(first.status).toEqual(TodoStatus.ACTIVE);
  });

  it('should add a new todo if list is not empty and increment the id', () => {
    const todoTitle = 'New Todo';
    const copyMockState = cloneDeep(mockState);

    const newState = todoReducer(copyMockState, addTodo(todoTitle));

    expect(newState.todos.length).toBe(3);

    const third = newState.todos[2];
    expect(third.id).toBe(2);
    expect(third.title).toEqual(todoTitle);
    expect(third.status).toEqual(TodoStatus.ACTIVE);
  });

  it('should remove a todo', () => {
    const todoId = 0;
    const copyMockState = cloneDeep(mockState);

    const newState = todoReducer(copyMockState, removeTodo(todoId));

    expect(newState.todos.length).toBe(1);

    const [first] = newState.todos;
    expect(first.id).toBe(1);
    expect(first.title).toEqual('Test todo 2');
    expect(first.status).toEqual(TodoStatus.ACTIVE);
  });

  it('should edit a todo', () => {
    const todoId = 0;
    const editTitleText = 'New Title';
    const copyMockState = cloneDeep(mockState);

    const newState = todoReducer(copyMockState, editTodo(todoId, editTitleText));

    const todo = newState.todos.find(todo => todo.id === todoId);

    expect(todo).toBeTruthy();

    const typedTodo = todo as Todo;

    expect(typedTodo.id).toBe(0);
    expect(typedTodo.title).toEqual(editTitleText);
    expect(typedTodo.status).toEqual(TodoStatus.ACTIVE);
  });

  it('should make a todo status Complete', () => {
    const todoId = 0;
    const copyMockState = cloneDeep(mockState);

    const newState = todoReducer(copyMockState, toggleTodoStatus(todoId));

    const todo = newState.todos.find(todo => todo.id === todoId);

    expect(todo).toBeTruthy();

    const typedTodo = todo as Todo;

    expect(typedTodo.id).toBe(0);
    expect(typedTodo.status).toEqual(TodoStatus.COMPLETE);
  });

  it('should make a todo status Active', () => {
    const todoId = 0;
    const copyMockState = cloneDeep(mockState);
    copyMockState.todos[0].status = TodoStatus.COMPLETE;

    const newState = todoReducer(copyMockState, toggleTodoStatus(todoId));

    const todo = newState.todos.find(todo => todo.id === todoId);

    expect(todo).toBeTruthy();

    const typedTodo = todo as Todo;

    expect(typedTodo.id).toBe(0);
    expect(typedTodo.status).toEqual(TodoStatus.ACTIVE);
  });

  it('should mark all todos as Complete', () => {
    const copyMockState = cloneDeep(mockState);

    const newState = todoReducer(copyMockState, markAllComplete());

    newState.todos.forEach(todo => expect(todo.status === TodoStatus.COMPLETE));
  });

  it('should remove all todos', () => {
    const copyMockState = cloneDeep(mockState);

    const newState = todoReducer(copyMockState, removeAll());

    expect(newState.todos.length).toBe(0);
  });

  it('should set filter to show only complete', () => {
    const copyMockState = cloneDeep(mockState);

    const newState = todoReducer(copyMockState, setFilter(FilterType.COMPLETE));

    expect(newState.filter).toEqual(FilterType.COMPLETE);
  });

  it('should set filter to show only active', () => {
    const copyMockState = cloneDeep(mockState);

    const newState = todoReducer(copyMockState, setFilter(FilterType.ACTIVE));

    expect(newState.filter).toEqual(FilterType.ACTIVE);
  });
});
