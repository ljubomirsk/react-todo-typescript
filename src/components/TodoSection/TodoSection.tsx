import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { MapStateToProps, connect, MapDispatchToProps } from 'react-redux';
import styled from '../../config/styled-components';

import {
  addTodo as addTodoAction,
  removeTodo as removeTodoAction,
  editTodo as editTodoAction,
  toggleTodoStatus as toggleTodoStatusAction,
  markAllComplete as markAllCompleteAction,
  removeAll as removeAllAction,
  setFilter as setFilterAction,
} from '../../store/actions/todoActions';

import { Todo } from '../../store/reducers/types/TodoState';
import { RootState } from '../../store/reducers/types/RootState';

import AddTodo from '../AddTodo/AddTodo';
import TodoItem from '../TodoItem/TodoItem';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import {
  getTodosWithFilter,
  getFilterType,
  getAllTodos,
} from '../../store/selectors/todoSelectors';
import { FilterType } from '../../store/reducers/todo/todoReducer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

interface StateProps {
  filteredTodos: Todo[];
  allTodos: Todo[];
  filterType: FilterType;
}

interface DispatchProps {
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, newValue: string) => void;
  toggleTodoStatus: (id: number) => void;
  removeAllTodos: () => void;
  markAllAsComplete: () => void;
  filterByType: (filter: FilterType) => void;
}

type Props = StateProps & DispatchProps;

const TodoSection: FunctionComponent<Props> = props => {
  const [todoTitle, setTodoTitle] = useState('');
  const {
    filteredTodos,
    allTodos,
    filterType,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodoStatus,
    removeAllTodos,
    markAllAsComplete,
    filterByType,
  } = props;

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoTitle(e.target.value);
  };

  const onAddButtonClick = (): void => {
    addTodo(todoTitle);
    setTodoTitle('');
  };

  const onToggleStatus = (id: number): void => {
    toggleTodoStatus(id);
  };

  const onEdit = (id: number, newTitle: string): void => {
    editTodo(id, newTitle);
  };

  const onDelete = (id: number): void => {
    removeTodo(id);
  };

  const filterByTodoType = (filter: FilterType): (() => void) => () => {
    filterByType(filter);
  };

  return (
    <Container>
      <AddTodo value={todoTitle} onChange={onInputChanged} onClick={onAddButtonClick} />
      <ButtonActionsContainer>
        <Button
          variant="default"
          width="150px"
          disabled={allTodos.length === 0}
          onClick={markAllAsComplete}
        >
          Mark all as complete
        </Button>
        <Button
          variant="delete"
          width="150px"
          disabled={allTodos.length === 0}
          onClick={removeAllTodos}
        >
          Delete all
        </Button>
      </ButtonActionsContainer>
      <Filter filterType={filterType} filterByType={filterByTodoType} />
      {filteredTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Container>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  filteredTodos: getTodosWithFilter(state),
  filterType: getFilterType(state),
  allTodos: getAllTodos(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
  addTodo: addTodoAction,
  removeTodo: removeTodoAction,
  editTodo: editTodoAction,
  toggleTodoStatus: toggleTodoStatusAction,
  removeAllTodos: removeAllAction,
  markAllAsComplete: markAllCompleteAction,
  filterByType: setFilterAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoSection);
