import React from 'react'
import ReactDOM from 'react-dom'
import {IconButton, FontIcon} from 'material-ui'
import {BernieColors} from '../../../../styles/bernie-css'
import Relay from 'react-relay'
import {connect} from 'react-redux'

const ApproveIcon = ({isPendingReview, event, approveEvent}) =>
  <IconButton
    title={isPendingReview ? 'mark reviewed' : 'mark approved'}
    onTouchTap={() => approveEvent(event.id)}
  >
    <FontIcon
      className="material-icons"
      color={event.isOfficial ? BernieColors.darkRed : null}
    >
      event_available
    </FontIcon>
  </IconButton>

ApproveIcon.propTypes = {
  isPendingReview: React.PropTypes.bool.isRequired,
  event: React.PropTypes.object.isRequired,
  approveEvent: React.PropTypes.func.isRequired
}

let mapStoreToProps = (store) => ({
  isPendingReview: store.admin.events.eventsQuery.status === 'PENDING_REVIEW'
})

let mapDispatchToProps = (dispatch) => ({
  approveEvent: (eventID) => false //TODO
})

export default Relay.createContainer(connect(mapStoreToProps, mapDispatchToProps)(ApproveIcon), {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        id
        isOfficial
      }
    `
  }
})
