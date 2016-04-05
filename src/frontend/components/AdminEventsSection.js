import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import EventsToolbar from './admin/events/EventsToolbar'
import {Provider} from 'react-redux';
import store from '../redux/store'

let relayDependencies = {
  fragments: {

  }
}

const AdminEventsSection = ({history}) =>
  <Provider store={store}>
    <EventsToolbar history={history}/>
  </Provider>

// export default Relay.createContainer(AdminEventsSection, relayDependencies)
export default AdminEventsSection