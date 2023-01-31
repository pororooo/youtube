import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { videosReducer } from './reducers/videosReducers';

export default createStore(videosReducer, applyMiddleware(thunk));