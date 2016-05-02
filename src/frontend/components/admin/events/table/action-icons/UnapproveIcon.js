import React from 'react'
import ReactDOM from 'react-dom'
import {IconButton, FontIcon} from 'material-ui'
import {BernieColors} from '../../../../styles/bernie-css'
import Relay from 'react-relay'
import {connect} from 'react-redux'

const UnapproveIcon = ({event, unapproveEvent}) =>
  <IconButton
    title="move to approval queue"
    onTouchTap={() => unapproveEvent(event.id)}
  >
    <FontIcon className="material-icons" color={event.isOfficial ? BernieColors.darkRed : null}
              hoverColor={BernieColors.red}>
      event_busy
    </FontIcon>
  </IconButton>

UnapproveIcon.propTypes = {
  event: React.PropTypes.object.isRequired,
  unapproveEvent: React.PropTypes.func.isRequired
}

let mapDispatchToProps = (dispatch) => ({
  unapproveEvent: (eventID) => false //TODO
})

export default Relay.createContainer(connect(false, mapDispatchToProps)(UnapproveIcon), {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        id
        isOfficial
      }
    `
  }
})
