import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import EventsToolbar from './admin/events/EventsToolbar'
import EventsTable from './admin/events/EventsTable'
import {Provider} from 'react-redux';
import store from '../redux/store'

const AdminEventsSection = () =>
  <Provider store={store}>
    <EventsToolbar />
    <EventsTable />
  </Provider>

export default Relay.createContainer(AdminEventsSection, {
  initialVariables: store.getState().admin.events.eventsQuery,
  fragments: {
    listContainer: () => Relay.QL`
      fragment on ListContainer {
        events(
          first: $numEvents
          eventFilterOptions: $filters
          hostFilterOptions: $hostFilters
          status: $status
          sortField: $sortField
          sortDirection: $sortDirection
        ) {
          ${EventsTable.getFragment('events')}
        }
      }
    `
  }
})