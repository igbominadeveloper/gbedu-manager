import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer, { initialState } from './reducer';

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(...middleWare))
);

export default store;
