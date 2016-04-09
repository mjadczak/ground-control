import React from 'react'
import ReactDOM from 'react-dom'
import BodyCell from './BodyCell'
import {connect} from 'react-redux'
import {selectEvents, deselectEvents} from '../../../../redux/admin/events/actions'
import Relay from 'react-relay'

const SelectCell = ({isSelected, selectEvent, deselectEvent, ...props}) =>
  <BodyCell {...props}>
    <Checkbox
      name="_events-cb"
      value=""
      checked={isSelected}
      onCheck={() => {
        if (isSelected)
          deselectEvent()
        else
          selectEvent()
      }}
      style={{marginLeft: '15px'}}
    />
  </BodyCell>

SelectCell.propTypes = {
  isSelected: React.PropTypes.bool.isRequired,
  selectEvent: React.PropTypes.func.isRequired,
  deselectEvent: React.PropTypes.func.isRequired
}

const mapStoreToProps = (store, ownProps) => ({
  isSelected: store.admin.events.selectedEvents.contains(ownProps.event.id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectEvent: () => dispatch(selectEvents([ownProps.event.id])),
  deselectEvent: () => dispatch(deselectEvents([ownProps.event.id]))
})

let connectedSelectCell = connect(mapStoreToProps, mapDispatchToProps)(SelectCell)

connectedSelectCell.propTypes = {
  event: React.PropTypes.object.isRequired
}

export default Relay.createContainer(connectedSelectCell, {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        id
      }
    `
  }
})

//Prop propagation
//input props ---> Relay xform ---> Redux xform ---> inner component