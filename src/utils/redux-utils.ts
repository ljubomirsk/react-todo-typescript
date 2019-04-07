import { Reducer, Action, AnyAction } from 'redux';

export interface ActionMap<S, A extends Action = AnyAction> {
  [key: string]: Reducer<S, A>;
}

/**
 * Creates a reducer which is a combination of all reducers passed in the action map. Each reducer in the action map
 * handles the action whose type is equal to the key of the specific reducer in the map.
 *
 * @param {ActionMap<S>} actionMap The map of reducers.
 * @param {S} initialState The initial state of the reducer tree.
 *
 * @returns {Reducer<S>} The combined reducer.
 */
export default function reducerWithActionMap<S, A extends Action = AnyAction>(
  actionMap: ActionMap<S, A>,
  initialState: S
): Reducer<S, A> {
  const isDevelopment =
    process.env.REACT_APP_NODE_ENV !== 'production' && process.env.REACT_APP_NODE_ENV !== 'sandbox';
  if (initialState == null && isDevelopment) {
    throw new Error('Initial state cannot be null!');
  }

  return (state = initialState, action) => {
    const reducer = actionMap[action.type];
    return reducer ? reducer(state, action) : state;
  };
}

/**
 * Interface that wraps the existing Action interface from Redux and adds additional
 * template P to specify the payload.
 *
 * @export
 * @interface ActionWithPayload
 * @extends {Action<T>}
 * @template T The type of the actions
 * @template P The payload type
 */
export interface ActionWithPayload<T, P = any> extends Action<T> {
  payload?: P;
}
