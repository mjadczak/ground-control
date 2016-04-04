import { combineReducers } from 'redux';
import * as adminReducers from './admin/reducers'

export const admin = combineReducers(adminReducers)

//Global reducers here