import { combineReducers } from 'redux'
import * as adminReducers from './admin/reducers'
import { reducer as uiReducer } from 'redux-ui'

export const admin = combineReducers(adminReducers)

//Global reducers here

export const ui = uiReducer