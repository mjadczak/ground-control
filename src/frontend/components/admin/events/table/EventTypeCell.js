import React from 'react'
import ReactDOM from 'react-dom'
import BodyCell from './BodyCell'
import Relay from 'react-relay'

const EventTypeCell = ({event, ...props}) =>
  <BodyCell {...props}>
    {event.eventType.name}
  </BodyCell>

EventTypeCell.propTypes = {
  event: React.PropTypes.object.isRequired
}

export default Relay.createContainer(EventTypeCell, {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        eventType {
          name
        }
      }
    `
  }
})