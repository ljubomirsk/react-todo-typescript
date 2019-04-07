import React, { FunctionComponent, ChangeEvent } from 'react';
import styled from '../../config/styled-components';
import Input from '../Input/Input';
import Button from '../Button/Button';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
`;

interface Props {
  value: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonText?: string;
}

const AddTodo: FunctionComponent<Props> = ({
  value,
  onClick,
  onChange,
  buttonText = 'Add Todo',
}) => (
  <Container>
    <Input type="text" placeholder="Todo title" onChange={onChange} value={value} />
    <Button variant="default" onClick={onClick}>
      {buttonText}
    </Button>
  </Container>
);

export default AddTodo;