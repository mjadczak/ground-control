import qs from 'qs'
import {CHANGE_QUERY, SHOW_DIALOG, DELETE_SELECTED_EVENTS} from './actions'

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
const getDefaultEventsQuery = () => {
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

export function eventsQuery(state = getDefaultEventsQuery(), action) {
  switch (action.type) {
    case CHANGE_QUERY:
      return {...state, ...action.query}
    default:
      return state
  }
}
//</editor-fold>

//<editor-fold desc="Dialogs">
//Dialogs
let initialDialogsVisibleState = {
  deleteEvent: false,
  eventPreview: false,
  createEvent: false,
  filters: false,
  sendEventEmail: false
}

export function visibleDialogs(state = initialDialogsVisibleState, action) {
  switch (action.type) {
    case SHOW_DIALOG:
      return {...state, [action.dialogName]: true}
    case DELETE_SELECTED_EVENTS:
      return {...state, deleteEvent: true}
    default:
      return state
  }
}
//</editor-fold>