import React from 'react'
import ReactDOM from 'react-dom'
import DateCell from './DateCell'
import Relay from 'react-relay'

const StartDateCell = ({event, ...props}) =>
  <DateCell utcOffset={event.localUTCOffset} timezone={event.localTimezone} date={event.startDate} {...props} />

StartDateCell.propTypes = {
  event: React.PropTypes.object.isRequired
}

export default Relay.createContainer(StartDateCell, {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        startDate
        localUTCOffset
        localTimezone
      }
    `
  }
})