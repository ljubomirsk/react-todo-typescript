import { Reducer } from 'redux';
import reducerWithActionMap, { ActionMap } from '../../utils/redux-utils';
import { TodoState } from '../types/TodoState';

const initialState: TodoState = {
  todos: [],
};

type TodoReducer = Reducer<TodoState>;

const actionMap: ActionMap<TodoState> = {};

export default reducerWithActionMap(actionMap, initialState);
