import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers'

let rootReducer = combineReducers(reducers)
let store = createStore(rootReducer)

export default store