import React, { FunctionComponent } from 'react';
import { ifProp } from 'styled-tools';
import styled, { css } from '../../config/styled-components';
import { FilterType } from '../../store/reducers/todo/todoReducer';

const FilterOptionsContainer = styled.div`
  display: flex;
  margin: 1em 0;
`;

const FilterOption = styled.div<{ selected: boolean }>`
  display: flex;
  border-radius: 7px;
  padding: 10px;
  box-shadow: ${({ theme }) => `0 5px 5px 0 ${theme.colors.shadow}`};
  ${ifProp(
    'selected',
    css`
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 800;
    `
  )}
  margin: 0 10px;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

interface Props {
  filterType: FilterType;
  filterByType: (filterType: FilterType) => () => void;
}

const Filter: FunctionComponent<Props> = ({ filterType, filterByType }) => (
  <FilterOptionsContainer>
    <FilterOption
      selected={filterType === FilterType.ACTIVE}
      onClick={filterByType(FilterType.ACTIVE)}
    >
      Active
    </FilterOption>
    <FilterOption
      selected={filterType === FilterType.COMPLETE}
      onClick={filterByType(FilterType.COMPLETE)}
    >
      Completed
    </FilterOption>
    <FilterOption selected={filterType === FilterType.ALL} onClick={filterByType(FilterType.ALL)}>
      All
    </FilterOption>
  </FilterOptionsContainer>
);

export default Filter;
