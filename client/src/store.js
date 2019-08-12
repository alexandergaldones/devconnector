import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // view app storage-states etcs - for chrome extension visibility
import thunk from 'redux-thunk'; // middleware
import rootReducer from './reducers' // multiple reducer combine them in here

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;