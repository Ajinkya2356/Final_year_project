// src/reducers/index.ts
import { combineReducers } from 'redux';
import workerReducer from './userReducer';

const rootReducer = combineReducers({
    user: workerReducer,
    // Add other reducers here
});

export default rootReducer;