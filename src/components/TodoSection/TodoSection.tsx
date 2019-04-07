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
} from '../../store/actions/todoActions';

import { Todo } from '../../store/reducers/types/TodoState';
import { RootState } from '../../store/reducers/types/RootState';

import AddTodo from '../AddTodo/AddTodo';
import TodoItem from '../TodoItem/TodoItem';
import Button from '../Button/Button';

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
  todos: Todo[];
}

interface DispatchProps {
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, newValue: string) => void;
  toggleTodoStatus: (id: number) => void;
  removeAllTodos: () => void;
  markAllAsComplete: () => void;
}

type Props = StateProps & DispatchProps;

const TodoSection: FunctionComponent<Props> = props => {
  const [todoTitle, setTodoTitle] = useState('');
  const {
    todos,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodoStatus,
    removeAllTodos,
    markAllAsComplete,
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

  return (
    <Container>
      <AddTodo value={todoTitle} onChange={onInputChanged} onClick={onAddButtonClick} />
      <ButtonActionsContainer>
        <Button variant="default" onClick={markAllAsComplete}>
          Mark all as complete
        </Button>
        <Button variant="delete" onClick={removeAllTodos}>
          Delete all
        </Button>
      </ButtonActionsContainer>
      {todos.map(todo => (
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
  todos: state.todo.todos,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
  addTodo: addTodoAction,
  removeTodo: removeTodoAction,
  editTodo: editTodoAction,
  toggleTodoStatus: toggleTodoStatusAction,
  removeAllTodos: removeAllAction,
  markAllAsComplete: markAllCompleteAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoSection);
