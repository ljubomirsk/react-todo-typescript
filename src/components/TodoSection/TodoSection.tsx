import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { MapStateToProps, connect, MapDispatchToProps } from 'react-redux';
import styled from '../../config/styled-components';

import {
  addTodo as addTodoAction,
  removeTodo as removeTodoAction,
  editTodo as editTodoAction,
} from '../../store/actions/todoActions';

import { Todo } from '../../store/reducers/types/TodoState';
import { RootState } from '../../store/reducers/types/RootState';

import AddTodo from '../AddTodo/AddTodo';
import TodoItem from '../TodoItem/TodoItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

interface StateProps {
  todos: Todo[];
}

interface DispatchProps {
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, newValue: string) => void;
}

type Props = StateProps & DispatchProps;

const TodoSection: FunctionComponent<Props> = ({ todos, addTodo, removeTodo, editTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoTitle(e.target.value);
  };

  const onAddButtonClick = (): void => {
    addTodo(todoTitle);
    setTodoTitle('');
  };

  const onComplete = (id: number): void => {
    console.log(id);
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
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onComplete={onComplete}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoSection);
