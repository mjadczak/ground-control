//Actions for the AdminEventsSection

const actionPrefix = 'ADMIN/EVENTS/'
const mkSymbol = (name) => Symbol(actionPrefix + name)

export const CHANGE_QUERY = mkSymbol('CHANGE_QUERY')

export function changeQuery(query) {
  return {
    type: CHANGE_QUERY,
    query
  }
}

export const SHOW_DIALOG = mkSymbol('SHOW_DIALOG')

export function showDialog(dialogName) {
  return {
    type: SHOW_DIALOG,
    dialogName
  }
}

export const DELETE_EVENTS = mkSymbol('DELETE_EVENTS')

export function deleteEvents(eventIDs) {
  return {
    type: DELETE_EVENTS,
    eventIDs
  }
}

export const APPROVE_EVENTS = mkSymbol('APPROVE_EVENTS')

export function approveEvents(eventIDs) {
  return {
    type: APPROVE_EVENTS,
    eventIDs
  }
}

export const UNAPPROVE_EVENTS = mkSymbol('UNAPPROVE_EVENTS')

export function unapproveEvents(eventIDs) {
  return {
    type: UNAPPROVE_EVENTS,
    eventIDs
  }
}

export const SELECT_EVENT = Symbol('SELECT_EVENT')

export function selectEvent(eventID) {
  return {
    type: SELECT_EVENT,
    eventID
  }
}

export const DESELECT_EVENT = mkSymbol('DESELECT_EVENT')

export function deselectEvent(eventID) {
  return {
    type: DESELECT_EVENT,
    eventID
  }
}