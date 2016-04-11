import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import EventsToolbar from './admin/events/EventsToolbar'
import EventsTable from './admin/events/EventsTable'
import {connect} from 'react-redux';
import Loading from './Loading'

class AdminEventsSection extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    props.relay.setVariables(props.query || {})
    this.state = {
      loading: false
    }
  }

  render = () =>
    <div>
      <EventsToolbar />
      {
        this.state.loading
          ? <Loading />
          : <EventsTable events={this.props.listContainer.events}/>
      }
    </div>

  onReadyStateChange = ({done}) => this.setState({loading: !done})

  componentWillReceiveProps = ({query}) => {
    if (query !== this.props.query) {
      this.props.relay.setVariables(query.toJS(), this.onReadyStateChange)
    }
  }
}

let relayAdminEventsSection = Relay.createContainer(AdminEventsSection, {
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

const mapStoreToProps = (store) => ({
  query: store.admin.events.eventsQuery
})

export default connect(mapStoreToProps)(relayAdminEventsSection)