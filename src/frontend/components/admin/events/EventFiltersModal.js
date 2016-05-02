import React from 'react'
import ReactDOM from 'react-dom'
import ui from 'redux-ui'

const EventFiltersModal = () => <div></div>

let uiConfig = {
  state: {
    filters: (props, store) => store.admin.events.eventsQuery.filters
  }
}

export default ui(uiConfig)(EventFiltersModal)