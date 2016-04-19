import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import EventsToolbar from './admin/events/EventsToolbar'
import EventsTable from './admin/events/EventsTable'
import {connect} from 'react-redux';
import Loading from './Loading'
import globalStore from '../redux/store'

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
          : <EventsTable events={this.props.listContainer.events}/>
      }
    </div>

  onReadyStateChange = ({done, ...rest}) => {
    this.setState({loading: !done})
  }

  componentWillReceiveProps = ({query}) => {
    if (query !== this.props.query) {
      this.props.relay.setVariables(query.toJS(), this.onReadyStateChange)
    }
  }
}

const mapStoreToProps = (store) => ({
  query: store.admin.events.eventsQuery
})

let relayAdminEventsSection = Relay.createContainer(AdminEventsSection, {
  initialVariables: mapStoreToProps(globalStore.getState()).query.toJS(), //Small hack to get the initial variables to work
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

export default connect(mapStoreToProps)(relayAdminEventsSection)