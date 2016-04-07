import qs from 'qs'
import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'
import * as actions from './actions'

//Reducers handling state for the AdminEventsSection

//<editor-fold desc="Helpers">
//Helpers
const convertType = (value) => {
  if (typeof value === 'object') {
    let updatedValue = {}
    Object.keys(value).forEach((key) => {
      const currentValue = convertType(value[key])
      if (currentValue != undefined)
        value[key] = currentValue
    })
    return value
  }
  else if (value === 'none')
    return null
  else if (value === 'true')
    return true
  else if (value === 'false')
    return false
  else if (value != '' && !isNaN(value) && String(Number(value)) === value)
    return Number(value)
  else if (value)
    return String(value)
  else {
    return undefined
  }
}


//</editor-fold>

//<editor-fold desc="Events Query">
//Events query state
const getEventsQueryFromHash = () => {
  const hashParams  = convertType(qs.parse(location.hash.substr(1), {strictNullHandling: true}))
  let defaultParams = {
    numEvents: 100,
    sortField: 'startDate',
    sortDirection: 'ASC',
    status: 'PENDING_REVIEW',
    filters: {},
    hostFilters: {}
  }
  if (hashParams.query) {
    try {
      let newQueryParams     = {...defaultParams, ...hashParams.query}
      newQueryParams.filters = {...defaultParams.filters, ...hashParams.query.filters}
      return newQueryParams
    }
    catch (ex) {
      console.error('Invalid query parameters', ex)
    }
  }

  return defaultParams
}

const EventsQueryRecord = Immutable.Record({
  numEvents: 100,
  sortField: 'startDate',
  sortDirection: 'ASC',
  status: 'PENDING_REVIEW',
  filters: new Immutable.Set(),
  hostFilters: new Immutable.Set()
}, 'EventsQueryRecord')

export const eventsQuery = createReducer(new EventsQueryRecord(getEventsQueryFromHash()), {
  [actions.CHANGE_QUERY]: (eventsQuery, action) => eventsQuery.merge(action.query)
})
//</editor-fold>

//<editor-fold desc="Dialogs">
//Dialogs
const DialogsRecord = Immutable.Record({
  deleteEvent: false,
  eventPreview: false,
  createEvent: false,
  filters: false,
  sendEventEmail: false
}, 'DialogsRecord')

export const visibleDialogs = createReducer(new DialogsRecord(), {
  [actions.SHOW_DIALOG]: (visibleDialogs, action) => visibleDialogs.set(action.dialogName, true),
  [actions.DELETE_SELECTED_EVENTS]: (visibleDialogs, action) => visibleDialogs.set("deleteEvent", true)
})
//</editor-fold>

//<editor-fold desc="Event Selection">
//Selected Events

//this contains only the ids of the records - the record data should be read from Relay where necessary
export const selectedEvents = createReducer(new Immutable.Set(), {
  [actions.SELECT_EVENT]: (selectedEvents, action) => selectedEvents.add(action.eventID),
  [actions.DESELECT_EVENT]: (selectedEvents, action) => selectedEvents.remove(action.eventID)
})
//</editor-fold>