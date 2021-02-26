import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer, { initialState } from './reducer';

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleWare),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
