//Actions for the AdminEventsSection

export const CHANGE_QUERY = Symbol('CHANGE_QUERY')

export function changeQuery(query) {
  return {
    type: CHANGE_QUERY,
    query
  }
}

export const SHOW_DIALOG = Symbol('SHOW_DIALOG')

export function showDialog(dialogName) {
  return {
    type: SHOW_DIALOG,
    dialogName
  }
}

export const DELETE_SELECTED_EVENTS = Symbol('DELETE_EVENTS')

export function deleteSelectedEvents() {
  return {
    type: DELETE_SELECTED_EVENTS
  }
}

export const SELECT_EVENT = Symbol('SELECT_EVENT')

export function selectEvent(eventID) {
  return {
    type: SELECT_EVENT,
    eventID
  }
}

export const DESELECT_EVENT = Symbol('DESELECT_EVENT')

export function deselectEvent(eventID) {
  return {
    type: DESELECT_EVENT,
    eventID
  }
}