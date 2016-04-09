import React from 'react'
import ReactDOM from 'react-dom'
import HeaderCell from './HeaderCell'
import {changeQuery} from '../../../../redux/admin/events/actions'
import {connect} from 'react-redux'

const SortControllerCell = ({children, isSelected, sortDir = '', setSortBy, attribute, ...props}) =>
  <HeaderCell {...props}
    onClick={(e) => {
      let newDirection = sortDir === 'ASC' ? 'DESC' : 'ASC'
      setSortBy(attribute, newDirection)
    }}
    style={{
      cursor: 'pointer'
    }}
  >
    {children}
    {
      isSelected
        ? <FontIcon className="material-icons" style={{
          display: 'inline', float: 'right', position: 'relative', top: '-3px'
        }}>
        {(sortDir === 'ASC') ? 'arrow_drop_up' : 'arrow_drop_down'}
      </FontIcon>
        : null
    }
  </HeaderCell>

SortControllerCell.propTypes = {
  isSelected: React.PropTypes.bool.isRequired,
  sortDir: React.PropTypes.string,
  toggleSort: React.PropTypes.func.isRequired
}

const mapStoreToProps = (store, ownProps) => {
  let isSelected = store.admin.events.eventsQuery.sortField === ownProps.attribute
  return {
    isSelected,
    sortDir: isSelected ? store.admin.events.eventsQuery.sortDirection : ''
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSortBy: (attr, direction) => dispatch(changeQuery({
    sortField: attr,
    sortDirection: direction
  }))
})

let connectedSortControllerCell = connect(mapStoreToProps, mapDispatchToProps)(SortControllerCell)

connectedSortControllerCell.propTypes = {
  attribute: React.PropTypes.string.isRequired
}

export default connectedSortControllerCell