import {combineReducers} from 'redux'
import * as eventsReducers from './events/reducers'

export const events = combineReducers(eventsReducers)

//Admin reducers here