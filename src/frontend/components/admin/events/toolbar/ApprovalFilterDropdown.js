import React from 'react'
import ReactDOM from 'react-dom'
import {DropDownMenu} from 'material-ui'
import {changeQuery} from '../../../../redux/admin/events/actions'
import {approvalFilterOptions as options} from '../eventsLogic'
import {connect} from 'react-redux';
import MenuItem from 'material-ui/lib/menus/menu-item'

const ApprovalFilterDropdown = ({status, statusOptions = options, onStatusChange}) =>
  <DropDownMenu
    value={status}
    onChange={(event, index, value) => onStatusChange(value)}
    autoWidth={true}
    style={{marginRight: 0, float: 'left'}}
  >
    {Object.keys(statusOptions).map((item) =>
      <MenuItem value={item} key={item}
                primaryText={statusOptions[item].text}/>
    )}
  </DropDownMenu>

ApprovalFilterDropdown.propTypes = {
  status: React.PropTypes.string.isRequired,
  onStatusChange: React.PropTypes.func.isRequired,
  statusOptions: React.PropTypes.object
}

const mapStoreToProps = (store, ownProps) => ({
  status: store.admin.events.eventsQuery.status
})

const mapDispatchToProps = (dispatch) => ({
  onStatusChange: (status) => dispatch(changeQuery({status}))
})

export default connect(mapStoreToProps, mapDispatchToProps)(ApprovalFilterDropdown)