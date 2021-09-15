import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  ClassDataReducer,
  IClassDataState,
} from './ClassData/ClassDataReducer';

export interface ICombinedState {
  allClass: IClassDataState;
}

const appReducer = combineReducers({
  allClass: ClassDataReducer,
});

const middleware = [thunk];

export const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
