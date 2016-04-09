//Actions for the AdminEventsSection

const actionPrefix = 'ADMIN/EVENTS/'
const mkSymbol     = (name) => Symbol(actionPrefix + name)

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

export const SELECT_EVENTS = mkSymbol('SELECT_EVENTS')

export function selectEvents(eventIDs) {
  return {
    type: SELECT_EVENTS,
    eventIDs
  }
}

export const DESELECT_EVENTS = mkSymbol('DESELECT_EVENTS')

export function deselectEvents(eventIDs) {
  return {
    type: DESELECT_EVENTS,
    eventIDs
  }
}

export const DESELECT_ALL_EVENTS = mkSymbol('DESELECT_ALL_EVENTS')

export function deselectAllEvents() {
  return {
    type: DESELECT_ALL_EVENTS
  }
}