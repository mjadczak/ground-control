import React from 'react'
import ReactDOM from 'react-dom'
import BodyCell from './BodyCell'
import {BernieColors} from '../../../styles/bernie-css'
import ActionIcons from './ActionIcons'
import {availableActions} from '../eventsLogic'
import Relay from 'react-relay'
import {connect} from 'react-redux'

const ActionCell = ({event, currentUser, status}) =>
  <BodyCell {...(event.isOfficial ? {style: {backgroundColor: BernieColors.lightBlue}} : {})}>

      {availableActions({status, currentUser}).map((actionName) => {
          let IconComponent = ActionIcons[actionName]
          return <IconComponent key={actionName} {...{event}} />
        }
      )}
    
  </BodyCell>

ActionCell.propTypes = {
  event: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  status: React.PropTypes.string.isRequired
}

const mapStoreToProps = (store) => ({
  status: store.admin.events.eventsQuery.status
})

export default Relay.createContainer(connect(mapStoreToProps)(ActionCell), {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        isOfficial
        ${Object.keys(ActionIcons).map(compName => ActionIcons[compName].getFragment('event'))}
      }
    `,
    currentUser: () => Relay.QL`
      fragment on User {
        ${availableActions.currentUserFragment}
      }
    `
  }
})