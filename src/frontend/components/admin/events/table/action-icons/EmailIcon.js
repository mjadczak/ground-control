import React from 'react'
import ReactDOM from 'react-dom'
import {IconButton, FontIcon} from 'material-ui'
import {BernieColors} from '../../../../styles/bernie-css'
import Relay from 'react-relay'
import {connect} from 'react-redux'

const EmailIcon = ({event, emailEvent}) =>
  <IconButton
    title='send email'
    onTouchTap={() => emailEvent(event.id)}
  >
    <FontIcon
      className="material-icons"
      color={event.isOfficial ? BernieColors.darkRed : null}
    >
      email
    </FontIcon>
  </IconButton>

EmailIcon.propTypes = {
  event: React.PropTypes.object.isRequired,
  emailEvent: React.PropTypes.func.isRequired
}

let mapDispatchToProps = (dispatch) => ({
  emailEvent: (eventID) => false //TODO
})

export default Relay.createContainer(connect(false, mapDispatchToProps)(EmailIcon), {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        id
      }
    `
  }
})
