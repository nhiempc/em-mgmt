import { createStore } from 'redux';
import rootReducer from './reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancer = composeWithDevTools();

const store = createStore(rootReducer, composeEnhancer);

export default store;
