import JSURL from 'jsurl'
import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'
import * as actions from './actions'

//Reducers handling state for the AdminEventsSection

//<editor-fold desc="Events Query">
//Events query state
const getEventsQueryFromHash = () => {
  let parsed = JSURL.parse(location.hash)
  if (!parsed) return {}
  if (!parsed.admin) return {}
  if (!parsed.admin.events) return {}
  if (!parsed.admin.events.query) return {}
  //Could use a null-chaining operator right about now
  return parsed.admin.events.query
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
  [actions.CHANGE_QUERY]: (eventsQuery, action) => {
    //Save off location into the hash
    let newState = eventsQuery.merge(action.query)
    location.hash = JSURL.stringify({
      admin: {
        events: {
          query: newState.toJS()
        }
      }
    })
    return newState
  }
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
  [actions.DELETE_EVENTS]: (visibleDialogs, action) => visibleDialogs.set("deleteEvent", true)
})
//</editor-fold>

//<editor-fold desc="Event Selection">
//Selected Events

//this contains only the ids of the records - the record data should be read from Relay where necessary
export const selectedEvents = createReducer(new Immutable.Set(), {
  [actions.SELECT_EVENTS]: (selectedEvents, action) => selectedEvents.union(action.eventIDs),
  [actions.DESELECT_EVENTS]: (selectedEvents, action) => selectedEvents.subtract(action.eventIDs),
  [actions.DESELECT_ALL_EVENTS]: (selectedEvents, action) => new Immutable.Set()
})
//</editor-fold>