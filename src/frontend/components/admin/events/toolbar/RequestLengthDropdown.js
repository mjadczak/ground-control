import React from 'react'
import ReactDOM from 'react-dom'
import {DropDownMenu} from 'material-ui'
import {changeQuery} from '../../../../redux/admin/events/actions'
import {resultLengthOptions as options} from '../eventsLogic'
import {connect} from 'react-redux';
import MenuItem from 'material-ui/lib/menus/menu-item'

const ApprovalFilterDropdown = ({numEvents, numEventsOptions = options, onNumEventsChange}) =>
  <DropDownMenu
    value={numEvents}
    onChange={(event, index, value) => onNumEventsChange(value)}
    autoWidth={true}
    style={{marginRight: 0, marginLeft: 0, float: 'left'}}
  >
    {numEventsOptions.map((value) =>
      <MenuItem value={value} key={value} primaryText={`${value} Events`}/>
    )}
  </DropDownMenu>

ApprovalFilterDropdown.propTypes = {
  numEvents: React.PropTypes.number.isRequired,
  onNumEventsChange: React.PropTypes.func.isRequired,
  numEventsOptions: React.PropTypes.arrayOf(React.PropTypes.number)
}

const mapStoreToProps = (store, ownProps) => ({
  numEvents: store.admin.events.eventsQuery.numEvents
})

const mapDispatchToProps = (dispatch) => ({
  onNumEventsChange: (numEvents) => dispatch(changeQuery({numEvents}))
})

export default connect(mapStoreToProps, mapDispatchToProps)(ApprovalFilterDropdown)