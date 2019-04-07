import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import styled from '../../config/styled-components';
import { Todo as TodoProps } from '../../store/reducers/types/TodoState';
import Button from '../Button/Button';
import AddTodo from '../AddTodo/AddTodo';
import { TodoStatus } from '../../store/reducers/todo/todoReducer';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 200px;
  border-radius: 7px;
  box-shadow: ${({ theme }) => `0 5px 5px 0 ${theme.colors.shadow}`};
  background: transparent;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0.3em 1em;
`;

interface Props {
  todo: TodoProps;
  onToggleStatus: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
  onDelete: (id: number) => void;
}

const TodoItem: FunctionComponent<Props> = ({ todo, onToggleStatus, onEdit, onDelete }) => {
  const [editValue, setEditValue] = useState(todo.title);
  const [edit, setEdit] = useState(false);

  const { id, title, status } = todo;

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditValue(e.target.value);
  };

  const onEditButtonClick = (): void => {
    setEdit(true);
  };

  const onCancelEdit = (): void => {
    setEdit(false);
  };

  const onEditTodo = (): void => {
    onEdit(id, editValue);
    setEdit(false);
  };

  const onToggleTodoStatus = (): void => {
    onToggleStatus(id);
  };

  const onDeleteTodo = (): void => {
    onDelete(id);
  };

  const titleSection = edit ? (
    <AddTodo
      value={editValue}
      onChange={onInputChanged}
      onClick={onEditTodo}
      buttonText="Confirm"
    />
  ) : (
    <h1>{title}</h1>
  );

  const editButton = edit ? (
    <Button variant="edit" onClick={onCancelEdit}>
      Cancel Edit
    </Button>
  ) : (
    <Button variant="edit" onClick={onEditButtonClick}>
      Edit
    </Button>
  );

  return (
    <Container>
      <InfoContainer>
        {titleSection}
        <h3>Status: {status}</h3>
      </InfoContainer>
      <InfoContainer>
        <Button variant="default" onClick={onToggleTodoStatus}>
          {status === TodoStatus.ACTIVE ? 'Mark as complete' : 'Mark as active'}
        </Button>
        {editButton}
        <Button variant="delete" onClick={onDeleteTodo}>
          Delete
        </Button>
      </InfoContainer>
    </Container>
  );
};

export default TodoItem;
