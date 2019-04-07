import cloneDeep from 'lodash/cloneDeep';
import { getTodoState, getFilterType, getAllTodos, getTodosWithFilter } from './todoSelectors';
import { RootState } from '../reducers/types/RootState';
import { mockState } from '../reducers/todo/todoReducer.test';
import { TodoStatus, FilterType } from '../reducers/todo/todoReducer';

const mockStoreState: RootState = {
  todo: mockState,
};

describe('TodoSelectors', () => {
  it('should return the todo state', () => {
    const selectedState = getTodoState(mockStoreState);

    expect(selectedState).toEqual(mockStoreState.todo);
  });

  it('should return the filter type', () => {
    const selectedFilter = getFilterType(mockStoreState);

    expect(selectedFilter).toEqual(mockStoreState.todo.filter);
  });

  it('should return all todos', () => {
    const selectedTodos = getAllTodos(mockStoreState);

    expect(selectedTodos).toEqual(mockStoreState.todo.todos);
  });

  it('should return all todos by status when filter ALL', () => {
    const selectedTodosWithFilter = getTodosWithFilter(mockStoreState);

    expect(selectedTodosWithFilter.length).toBe(2);
  });

  it('should return all todos by status when filter Completed', () => {
    const copyMockStoreState = cloneDeep(mockStoreState);
    copyMockStoreState.todo.todos[0].status = TodoStatus.COMPLETE;
    copyMockStoreState.todo.filter = FilterType.COMPLETE;
    const selectedTodosWithFilter = getTodosWithFilter(copyMockStoreState);

    expect(selectedTodosWithFilter.length).toBe(1);
  });

  it('should return all todos by status when filter Active', () => {
    const copyMockStoreState = cloneDeep(mockStoreState);
    copyMockStoreState.todo.todos[0].status = TodoStatus.COMPLETE;
    copyMockStoreState.todo.filter = FilterType.ACTIVE;
    const selectedTodosWithFilter = getTodosWithFilter(copyMockStoreState);

    expect(selectedTodosWithFilter.length).toBe(1);
  });
});
