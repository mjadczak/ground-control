import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import EventsToolbar from './admin/events/EventsToolbar'
import EventsTable from './admin/events/EventsTable'
import {Provider} from 'react-redux';
import store from '../redux/store'

const AdminEventsSection = ({listContainer}) =>
  <Provider store={store}>
    <div>
      <EventsToolbar />
      <EventsTable events={listContainer.events} />
    </div>
  </Provider>

export default Relay.createContainer(AdminEventsSection, {
  initialVariables: {
    numEvents: 100,
    sortField: 'startDate',
    sortDirection: 'ASC',
    status: 'PENDING_REVIEW',
    filters: {},
    hostFilters: {}
  },
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