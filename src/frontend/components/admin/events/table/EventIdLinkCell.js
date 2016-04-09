import React from 'react'
import ReactDOM from 'react-dom'
import BodyCell from './BodyCell'
import {BernieColors} from '../../../styles/bernie-css'
import Relay from 'react-relay'

const publicEventsRootUrl = 'https://secure.berniesanders.com/page/event/detail/'

const EventIDLinkCell = ({event, ...props}) => {

  let cellStyle = {}

  let linkStyle = {
    color: BernieColors.darkBlue
  }

  if (event.isOfficial) {
    cellStyle.backgroundColor = BernieColors.lightBlue
    linkStyle.color           = BernieColors.darkRed
  }

  return (
    <BodyCell {...props}
      style={cellStyle}
    >
      <a href={publicEventsRootUrl + event.eventIdObfuscated} style={linkStyle}
         target="_blank">{event.eventIdObfuscated}</a>
    </BodyCell>
  )
}

EventIDLinkCell.propTypes = {
  event: React.PropTypes.object.isRequired
}

export default Relay.createContainer(EventIDLinkCell, {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        isOfficial
        eventIdObfuscated
      }
    `
  }
})
