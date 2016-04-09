import React from 'react'
import ReactDOM from 'react-dom'
import DateCell from './DateCell'
import Relay from 'react-relay'

const CreateDateCell = ({event, ...props}) =>
  <DateCell date={event.createDate} {...props} />

CreateDateCell.propTypes = {
  event: React.PropTypes.object.isRequired
}

export default Relay.createContainer(CreateDateCell, {
  fragments: {
    event: Relay.QL`
      fragment on Event {
        createDate
      }
    `
  }
})