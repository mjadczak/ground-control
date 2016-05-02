import React from 'react'
import ReactDOM from 'react-dom'
import {IconButton, FontIcon} from 'material-ui'
import {BernieColors} from '../../../../styles/bernie-css'
import Relay from 'react-relay'
import {connect} from 'react-redux'

const EditIcon = ({event, editEvent}) =>
  <IconButton
    title='edit'
    onTouchTap={() => editEvent(event.id)}
  >
    <FontIcon
      className="material-icons"
      color={event.isOfficial ? BernieColors.darkRed : null}
    >
      edit
    </FontIcon>
  </IconButton>

EditIcon.propTypes = {
  event: React.PropTypes.object.isRequired,
  editEvent: React.PropTypes.func.isRequired
}

let mapDispatchToProps = (dispatch) => ({
  editEvent: (eventID) => false //TODO
})

export default Relay.createContainer(connect(false, mapDispatchToProps)(EditIcon), {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        id
      }
    `
  }
})
