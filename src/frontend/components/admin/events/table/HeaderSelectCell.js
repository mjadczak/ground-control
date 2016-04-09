import React from 'react'
import ReactDOM from 'react-dom'
import HeaderCell from './HeaderCell'
import {Checkbox} from 'material-ui'
import {connect} from 'react-redux'
import {BernieText, BernieColors} from '../../../styles/bernie-css'
import {selectEvents, deselectAllEvents} from '../../../../redux/admin/events/actions'
import Relay from 'react-relay'

const HeaderSelectCell = ({areSomeChecked, areAllChecked, handleMasterChecked, selectAllEvents, deselectAllEvents, ...props}) =>
  <HeaderCell {...props}>
    <Checkbox
      checked={areSomeChecked}
      onCheck={(event, currentlyChecked) => {
        //see https://html.spec.whatwg.org/multipage/forms.html#checkbox-state-(type=checkbox)

        if (!currentlyChecked) {
          //None selected, so select all
          selectAllEvents()
          return
        }

        //box is currently checked
        if (areAllChecked) {
          //and all events are selected, so deselect all
          deselectAllEvents()
          return
        }

        //not all events are selected, so select them all
        selectAllEvents()
      }}
      checkedIcon={
        areAllChecked
        ? <FontIcon className="material-icons">check_box</FontIcon>
        : <FontIcon className="material-icons">indeterminate_check_box</FontIcon>
      }
      style={{marginLeft: '15px'}}
      iconStyle={{color: BernieColors.blue}}
    />
  </HeaderCell>

HeaderSelectCell.propTypes = {
  areSomeChecked: React.PropTypes.bool.isRequired,
  areAllChecked: React.PropTypes.bool.isRequired,
  selectAllEvents: React.PropTypes.func.isRequired,
  deselectAllEvents: React.PropTypes.func.isRequired
}

const mapStoreToProps = (store, ownProps) => ({
  areSomeChecked: !store.admin.events.selectedEvents.isEmpty(),
  areAllChecked: store.admin.events.selectedEvents.size === ownProps.events.length
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectAllEvents: (events) => (
    () => dispatch(selectEvents(events))
  )(ownProps.events.map((event) => event.id)), //only run the map once
  deselectAllEvents: () => dispatch(deselectAllEvents())
})

let connectedHeaderSelectCell = connect(mapStoreToProps, mapDispatchToProps)(HeaderSelectCell)

//This is one level up so that the verification warning is thrown before we try to compute the descendant props using
// this one
connectedHeaderSelectCell.propTypes = {
  events: React.PropTypes.array.isRequired
}

export default Relay.createContainer(connectedHeaderSelectCell, {
  fragments: {
    events: () => Relay.QL`
      fragment on EventConnection {
        edges {
          node {
            id
          }
        }
      }
    `
  }
})

//Prop propagation
//input props ---> Relay xform ---> Redux xform ---> inner component