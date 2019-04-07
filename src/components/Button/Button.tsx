import { switchProp, ifProp, prop } from 'styled-tools';
import styled, { css } from '../../config/styled-components';

enum ButtonStyle {
  DEFAULT = 'default',
  DELETE = 'delete',
  EDIT = 'edit',
}

const Button = styled.button<{ variant: string; width?: string }>`
  outline: none;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  justify-content: space-around;
  border: none;
  margin: 0.4em;
  position: relative;
  padding: 0.8em;
  width: ${ifProp('width', prop('width'), '100px')};
  border-radius: 7px;
  box-shadow: ${({ theme }) => `0 5px 5px 0 ${theme.colors.shadow}`};
  transition: color 0.3s, background 0.3s, box-shadow 0.2s ease-out, transform 0.2s ease-out,
    background-position 0.2s ease-in-out;
  cursor: pointer;

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: auto;
  }

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => `0 5px 10px 2px ${theme.colors.shadow}`};
    transform: scale(1.03);
    background-position: 100% 0;
  }

  ${switchProp('variant', {
    [ButtonStyle.DEFAULT]: css`
      background: ${({ theme }) => theme.colors.primary};
    `,
    [ButtonStyle.DELETE]: css`
      background: ${({ theme }) => theme.colors.error};
    `,
    [ButtonStyle.EDIT]: css`
      background: ${({ theme }) => theme.colors.secondary};
    `,
  })}
`;

export default Button;
