import React from 'react'
import ReactDOM from 'react-dom'
import {IconButton, FontIcon} from 'material-ui'
import {BernieColors} from '../../../../styles/bernie-css'
import Relay from 'react-relay'
import {connect} from 'react-redux'

const DeleteIcon = ({event, deleteEvent}) =>
  <IconButton
    title="delete"
    onTouchTap={() => deleteEvent(event.id)}
  >
    <FontIcon className="material-icons" color={event.isOfficial ? BernieColors.darkRed : null}
              hoverColor={BernieColors.red}>
      delete
    </FontIcon>
  </IconButton>

DeleteIcon.propTypes = {
  event: React.PropTypes.object.isRequired,
  deleteEvent: React.PropTypes.func.isRequired
}

let mapDispatchToProps = (dispatch) => ({
  deleteEvent: (eventID) => false //TODO
})

export default Relay.createContainer(connect(false, mapDispatchToProps)(DeleteIcon), {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        id
        isOfficial
      }
    `
  }
})
