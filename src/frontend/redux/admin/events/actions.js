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