import React from 'react'
import ReactDOM from 'react-dom'
import {IconButton, FontIcon} from 'material-ui'
import {BernieColors} from '../../../../styles/bernie-css'
import Relay from 'react-relay'
import {connect} from 'react-redux'

const FfwdIcon = ({event, ffwdEvent}) =>
  <IconButton
    title='make fast forward request'
    onTouchTap={() => ffwdEvent(event.id)}
    disabled={!event.isSearchable}
  >
    <FontIcon
      className="material-icons"
      color={event.isOfficial ? BernieColors.darkRed : null}
    >
      fast_forward
    </FontIcon>
  </IconButton>

FfwdIcon.propTypes = {
  event: React.PropTypes.object.isRequired,
  ffwdEvent: React.PropTypes.func.isRequired
}

let mapDispatchToProps = (dispatch) => ({
  ffwdEvent: (eventID) => false //TODO
})

export default Relay.createContainer(connect(false, mapDispatchToProps)(FfwdIcon), {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        id
        isSearchable
      }
    `
  }
})
