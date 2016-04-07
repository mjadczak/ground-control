import React from 'react'
import ReactDOM from 'react-dom'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
  SelectField,
  DropDownMenu,
  Dialog,
  Tabs,
  Tab,
  FlatButton,
  RaisedButton,
  IconButton,
  FontIcon,
  Checkbox,
  TextField
} from 'material-ui'
import {connect} from 'react-redux';
import {showDialog} from '../../../redux/admin/events/actions'
import ApprovalFilterDropdown from './toolbar/ApprovalFilterDropdown'
import RequestLengthDropdown from './toolbar/RequestLengthDropdown'
import ImmutablePropTypes from 'react-immutable-proptypes'

const EventsToolbar = ({eventsQuery, visibleDialogs, showDialog, selectedEvents}, {history}) =>
  <Toolbar>
    <ToolbarGroup key={0} float="left">
      <ApprovalFilterDropdown />
      <RequestLengthDropdown />
      <ToolbarSeparator style={{marginLeft: 0}}/>
      <RaisedButton
        label="Filter"
        labelPosition="after"
        onTouchTap={() => showDialog('filters')}
        disabled={visibleDialogs.filters}
      >
        <FontIcon className="material-icons"
                  style={{position: 'relative', top: '6px', left: '6px'}}>filter_list</FontIcon>
      </RaisedButton>

    </ToolbarGroup>
    <ToolbarGroup key={1} float="right">
      <RaisedButton
        label="RSVPs"
        labelPosition="after"
        onTouchTap={() => {
              history.push('/admin/events/upload-rsvps')
            }}
        style={{marginRight: 0}}
      >
        <FontIcon className="material-icons"
                  style={{position: 'relative', top: '7px', left: '6px'}}>file_upload</FontIcon>
      </RaisedButton>
      <RaisedButton
        label="Create"
        labelPosition="after"
        onTouchTap={() => window.location = '/admin/events/create'}
      >
        <FontIcon className="material-icons" style={{position: 'relative', top: '7px', left: '6px'}}>add</FontIcon>
      </RaisedButton>
      <ToolbarSeparator style={{marginLeft: 0}}/>
      <RaisedButton
        label="Delete"
        primary={true}
        disabled={selectedEvents.isEmpty()}
        // onTouchTap={() => {
        //       this._handleEventDeletion(this.state.selectedRows);
        //     }}
      />
      { eventsQuery.status === 'PENDING_APPROVAL' //TODO: change these statuses to symbols?
        ? null
        :
        <RaisedButton
          label='Unapprove'
          style={{marginLeft: 0}}
          secondary={false}
          disabled={selectedEvents.isEmpty()}
          // onTouchTap={() => {
          //       this._handleEventConfirmation(this.state.selectedRows, true);
          //     }}
        />
      }
      { eventsQuery.status === 'APPROVED' //TODO: as above
        ? null
        :
        <RaisedButton
          label={(eventsQuery.status === 'PENDING_REVIEW') ? 'Mark Reviewed' : 'Mark Approved'}
          style={{marginLeft: 0}}
          secondary={true}
          disabled={selectedEvents.isEmpty()}

          // onTouchTap={() => {
          //       this._handleEventConfirmation(this.state.selectedRows);
          //     }}
        />
      }
    </ToolbarGroup>
  </Toolbar>

EventsToolbar.contextTypes = {
  history: React.PropTypes.object.isRequired //With react-router v2.x this will change to a `router` func (not object)
}

EventsToolbar.propTypes = {
  eventsQuery: ImmutablePropTypes.record.isRequired,
  visibleDialogs: ImmutablePropTypes.record.isRequired,
  selectedEvents: ImmutablePropTypes.set.isRequired,
  showDialog: React.PropTypes.func.isRequired
}

const mapStoreToProps = (store, ownProps) => ({
  eventsQuery: store.admin.events.eventsQuery,
  visibleDialogs: store.admin.events.visibleDialogs,
  selectedEvents: store.admin.events.selectedEvents
})

const mapDispatchToProps = (dispatch) => ({
  showDialog: (name) => dispatch(showDialog(name))
})

export default connect(mapStoreToProps, mapDispatchToProps)(EventsToolbar)