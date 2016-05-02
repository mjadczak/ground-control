import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import EventsToolbar from './admin/events/EventsToolbar'
import EventsTable from './admin/events/EventsTable'
import {connect} from 'react-redux';
import Loading from './Loading'
import globalStore from '../redux/store'
import * as accessors from '../redux/admin/events/accessors'

class AdminEventsSection extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      loading: !props.listContainer.events
    }
  }

  render = () =>
    <div>
      <EventsToolbar />
      {
        this.state.loading
          ? <Loading />
          : <EventsTable events={this.props.listContainer.events} currentUser={this.props.currentUser} />
      }
    </div>

  onReadyStateChange = ({done, ...rest}) => {
    this.setState({loading: !done})
  }

  componentWillReceiveProps = ({query}) => {
    if (query !== this.props.query) {
      this.props.relay.setVariables(accessors.getQueryVariablesFromQuery(query), this.onReadyStateChange)
    }
  }
}

const mapStoreToProps = (store) => ({
  query: store.admin.events.eventsQuery
})

let relayAdminEventsSection = Relay.createContainer(AdminEventsSection, {
  //Small hack to get the initial variables to work
  initialVariables: accessors.getQueryVariablesFromQuery(mapStoreToProps(globalStore.getState()).query),
  fragments: {
    currentUser: () => Relay.QL`
      fragment on User {
        ${EventsTable.getFragment('currentUser')}
      }
    `,
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

export default connect(mapStoreToProps)(relayAdminEventsSection)