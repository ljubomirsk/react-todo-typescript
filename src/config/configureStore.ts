import { createStore, Store } from 'redux';
import rootReducer from '../reducers/rootReducer';
import { RootState } from '../reducers/types/RootState';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export default function configureStore(): Store<RootState> {
  const store = createStore(
    rootReducer(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
