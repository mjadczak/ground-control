import React from 'react'
import ReactDOM from 'react-dom'
import {BernieText, BernieColors} from '../../styles/bernie-css'
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
import {Table, Column, ColumnGroup, Cell} from 'fixed-data-table'
import WindowSizeProvider from '../../helpers/WindowSizeProvider'
import HeaderCell from './table/HeaderCell'
import HeaderSelectCell from './table/HeaderSelectCell'
import SortControllerCell from './table/SortControllerCell'
import SelectCell from './table/SelectCell'
import EventIDLinkCell from './table/EventIDLinkCell'
import Relay from 'react-relay'

const EventsTable = ({events}, {windowWidth, windowHeight}) => {
  //Styling
  let tableStyle = {
    rowHeight: 83,
    groupHeaderHeight: 35,
    headerHeight: 50
  }

  let miscStyles = {
    selectCellWidth: 73
  }

  //Helpers
  const cellFunc = (Component) => (
    (rowIndex, width, height) => <Component event={events[rowIndex]} {...{width, height}} />
  )

  return <Table
    {...tableStyle}
    rowsCount={events.length}
    width={windowWidth}
    height={windowHeight - 112} //TODO: get this from an export in the toolbar/admin/section component itself?
    //onRowDoubleClick={this._handleRowClick} //TODO
    {...props}>
    <ColumnGroup
      fixed={true}
      header={<HeaderCell>Actions</HeaderCell>}>
      <Column
        header={<HeaderSelectCell events={events} />}
        cell={cellFunc(SelectCell)}
        fixed={true}
        width={miscStyles.selectCellWidth}
      />
      /*<Column //TODO
        header={<HeaderCell>Manage</HeaderCell>}
        cell={<this.ActionCell data={events} col="actions" />}
        fixed={true}
        width={approvalFilterOptions[this.props.relay.variables.status].actions.length * 48 + 16}
        align='center'
      />*/
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>Event</HeaderCell>}
    >
      <Column
        flexGrow={1}
        header={<HeaderCell>ID</HeaderCell>}
        cell={cellFunc(EventIDLinkCell)}
        width={100}
        align='center'
      />
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="eventTypeId">Type</SortControllerCell>}
        cell={
              <this.EventTypeCell data={events} col="eventType" attr="name" />
            }
        width={130}
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>Time</HeaderCell>}>
      <Column
        header={<SortControllerCell attribute="startDate">Event Date</SortControllerCell>}
        cell={<this.DateCell data={events} col="startDate" />}
        flexGrow={1}
        width={170}
      />
      <Column
        header={<SortControllerCell attribute="createDate">Create Date</SortControllerCell>}
        cell={<this.DateCell data={events} col="createDate" />}
        flexGrow={1}
        width={170}
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>About</HeaderCell>}>
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="name">Event Name</SortControllerCell>}
        cell={<this.TextCell data={events} col="name" />}
        width={250}
      />
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="description">Description</SortControllerCell>}
        cell={<this.NoHTMLCell data={events} col="description" />}
        width={450}
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>Event Host</HeaderCell>}>
      <Column
        flexGrow={1}
        header={<HeaderCell >Email</HeaderCell>}
        cell={<this.HostInfoCell data={events} col="host" info="email" />}
        width={220}
      />
      <Column
        flexGrow={1}
        header={<HeaderCell>Name</HeaderCell>}
        cell={<this.HostInfoCell data={events} col="host" info="name" />}
        width={150}
      />
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="contactPhone">Phone</SortControllerCell>}
        cell={<this.TextCell data={events} col="contactPhone" />}
        width={100}
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell >Detailed Info</HeaderCell>}>
      <Column
        header={<SortControllerCell attribute="duration">Duration</SortControllerCell>}
        cell={<this.DurationCell data={events} col="duration" />}
        flexGrow={1}
        width={110}
      />
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="capacity">Capacity</SortControllerCell>}
        cell={<this.TextCell data={events} col="capacity" />}
        width={100}
        align='center'
      />
      <Column
        flexGrow={1}
        header={<HeaderCell >RSVPs</HeaderCell>}
        cell={<this.TextCell data={events} col="attendeesCount" />}
        width={100}
        align='center'
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>Event Location</HeaderCell>}>
      <Column
        header={<SortControllerCell attribute="venueName">Venue</SortControllerCell>}
        cell={<this.TextCell data={events} col="venueName" />}
        flexGrow={1}
        width={150}
      />
      <Column
        header={<SortControllerCell attribute="venueAddr1">Address</SortControllerCell>}
        cell={<this.TextCell data={events} col="venueAddr1" />}
        flexGrow={1}
        width={150}
      />
      <Column
        header={<SortControllerCell attribute="venueCity">City</SortControllerCell>}
        cell={<this.TextCell data={events} col="venueCity" />}
        flexGrow={1}
        width={150}
      />
      <Column
        header={<SortControllerCell attribute="venueState">State</SortControllerCell>}
        cell={<this.TextCell data={events} col="venueState" />}
        flexGrow={1}
        width={80}
        align='center'
      />
      <Column
        header={<SortControllerCell attribute="venueZip">Zip Code</SortControllerCell>}
        cell={<this.TextCell data={events} col="venueZip" />}
        flexGrow={1}
        width={120}
        align='center'
      />
      <Column
        header={<SortControllerCell attribute="latitude">Latitude</SortControllerCell>}
        cell={<this.TextCell data={events} col="latitude" />}
        flexGrow={1}
        width={150}
        align='center'
      />
      <Column
        header={<SortControllerCell attribute="longitude">Longitude</SortControllerCell>}
        cell={<this.TextCell data={events} col="longitude" />}
        flexGrow={1}
        width={150}
        align='center'
      />
    </ColumnGroup>
  </Table>
}

EventsTable.contextTypes = {
  windowWidth: React.PropTypes.number.isRequired,
  windowHeight: React.PropTypes.number.isRequired
}

const EventsTableWrapped = (props) =>
  <WindowSizeProvider>
    <EventsTable {...props} />
  </WindowSizeProvider>

const relayConnectedEventsTableWrapped = Relay.createContainer(EventsTableWrapped, {
  fragments: {
    events: () => Relay.QL`
      fragment on EventConnection {
        ${HeaderSelectCell.getFragment('events')}
        edges {
          node {
            ${SelectCell.getFragment('event')}
            #TODO ActionCell
            ${EventIDLinkCell.getFragment('event')}
          }
        }
      }
    `
  }
})