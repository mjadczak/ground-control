import React from 'react'
import ReactDOM from 'react-dom'
import {Table, Column, ColumnGroup, Cell} from 'fixed-data-table'
import WindowSizeProvider from '../../helpers/WindowSizeProvider'
import HeaderCell from './table/HeaderCell'
import HeaderSelectCell from './table/HeaderSelectCell'
import SortControllerCell from './table/SortControllerCell'
import SelectCell from './table/SelectCell'
import EventIDLinkCell from './table/EventIDLinkCell'
import StartDateCell from './table/StartDateCell'
import CreateDateCell from './table/CreateDateCell'
import ActionCell from './table/ActionCell'
import * as TC from './table/TextCells'
import Relay from 'react-relay'
import {connect} from 'react-redux'
import {availableActions} from './eventsLogic'

const EventsTable = ({events, currentUser, status, ...props}, {windowWidth, windowHeight}) => {
  //Styling
  const tableStyle = {
    rowHeight: 83,
    groupHeaderHeight: 35,
    headerHeight: 50
  }

  const miscStyles = {
    selectCellWidth: 73,
    idCellWidth: 100,
    typeCellWidth: 130,
    dateCellWidth: 170,
    nameCellWidth: 250,
    descriptionCellWidth: 450,
    hostEmailCellWidth: 220,
    hostNameCellWidth: 150,
    hostPhoneCellWidth: 100,
    durationCellWidth: 110,
    capacityCellWidth: 100,
    rsvpsCellWidth: 100,
    venueNameCellWidth: 150,
    venueAddrCellWidth: 150,
    venueCityCellWidth: 150,
    venueStateCellWidth: 80,
    venueZipCellWidth: 120,
    latitudeCellWidth: 150,
    longitudeCellWidth: 150
  }

  //Helpers
  const cellFunc = (Component, props = {}) => (
    ({rowIndex, width, height}) => <Component event={events.edges[rowIndex].node} {...{width, height, ...props}} />
  )

  return <Table
    {...tableStyle}
    rowsCount={events.edges.length}
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

      <Column
        header={<HeaderCell>Manage</HeaderCell>}
        cell={cellFunc(ActionCell, {currentUser})}
        fixed={true}
        width={availableActions({status, currentUser}).size * 48 + 18} //TODO: get rid of magic numbers?
        align='center'
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>Event</HeaderCell>}
    >
      <Column
        flexGrow={1}
        header={<HeaderCell>ID</HeaderCell>}
        cell={cellFunc(EventIDLinkCell)}
        width={miscStyles.idCellWidth}
        align='center'
      />
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="eventTypeId">Type</SortControllerCell>}
        cell={cellFunc(TC.EventTypeCell)}
        width={miscStyles.typeCellWidth}
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>Time</HeaderCell>}>
      <Column
        header={<SortControllerCell attribute="startDate">Event Date</SortControllerCell>}
        cell={cellFunc(StartDateCell)}
        flexGrow={1}
        width={miscStyles.dateCellWidth}
      />
      <Column
        header={<SortControllerCell attribute="createDate">Create Date</SortControllerCell>}
        cell={cellFunc(CreateDateCell)}
        flexGrow={1}
        width={miscStyles.dateCellWidth}
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>About</HeaderCell>}>
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="name">Event Name</SortControllerCell>}
        cell={cellFunc(TC.EventNameCell)}
        width={miscStyles.nameCellWidth}
      />
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="description">Description</SortControllerCell>}
        cell={cellFunc(TC.EventDescriptionCell)}
        width={miscStyles.descriptionCellWidth}
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>Event Host</HeaderCell>}>
      <Column
        flexGrow={1}
        header={<HeaderCell >Email</HeaderCell>}
        cell={cellFunc(TC.EventHostEmailCell)}
        width={miscStyles.hostEmailCellWidth}
      />
      <Column
        flexGrow={1}
        header={<HeaderCell>Name</HeaderCell>}
        cell={cellFunc(TC.EventHostNameCell)}
        width={miscStyles.hostNameCellWidth}
      />
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="contactPhone">Phone</SortControllerCell>}
        cell={cellFunc(TC.EventHostPhoneCell)}
        width={miscStyles.hostPhoneCellWidth}
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell >Detailed Info</HeaderCell>}>
      <Column
        header={<SortControllerCell attribute="duration">Duration</SortControllerCell>}
        cell={cellFunc(TC.EventDurationCell)}
        flexGrow={1}
        width={miscStyles.durationCellWidth}
      />
      <Column
        flexGrow={1}
        header={<SortControllerCell attribute="capacity">Capacity</SortControllerCell>}
        cell={cellFunc(TC.EventCapacityCell)}
        width={miscStyles.capacityCellWidth}
        align='center'
      />
      <Column
        flexGrow={1}
        header={<HeaderCell >RSVPs</HeaderCell>}
        cell={cellFunc(TC.AttendeesCountCell)}
        width={miscStyles.rsvpsCellWidth}
        align='center'
      />
    </ColumnGroup>
    <ColumnGroup
      header={<HeaderCell>Event Location</HeaderCell>}>
      <Column
        header={<SortControllerCell attribute="venueName">Venue</SortControllerCell>}
        cell={cellFunc(TC.VenueNameCell)}
        flexGrow={1}
        width={miscStyles.venueNameCellWidth}
      />
      <Column
        header={<SortControllerCell attribute="venueAddr1">Address</SortControllerCell>}
        cell={cellFunc(TC.VenueAddressCell)}
        flexGrow={1}
        width={miscStyles.venueAddrCellWidth}
      />
      <Column
        header={<SortControllerCell attribute="venueCity">City</SortControllerCell>}
        cell={cellFunc(TC.VenueCityCell)}
        flexGrow={1}
        width={miscStyles.venueCityCellWidth}
      />
      <Column
        header={<SortControllerCell attribute="venueState">State</SortControllerCell>}
        cell={cellFunc(TC.VenueStateCell)}
        flexGrow={1}
        width={miscStyles.venueStateCellWidth}
        align='center'
      />
      <Column
        header={<SortControllerCell attribute="venueZip">Zip Code</SortControllerCell>}
        cell={cellFunc(TC.VenueZipCell)}
        flexGrow={1}
        width={miscStyles.venueZipCellWidth}
        align='center'
      />
      <Column
        header={<SortControllerCell attribute="latitude">Latitude</SortControllerCell>}
        cell={cellFunc(TC.LatitudeCell)}
        flexGrow={1}
        width={miscStyles.latitudeCellWidth}
        align='center'
      />
      <Column
        header={<SortControllerCell attribute="longitude">Longitude</SortControllerCell>}
        cell={cellFunc(TC.LongitudeCell)}
        flexGrow={1}
        width={miscStyles.longitudeCellWidth}
        align='center'
      />
    </ColumnGroup>
  </Table>
}

const mapStoreToProps = (store) => ({
  status: store.admin.events.eventsQuery.status
})

EventsTable.contextTypes = {
  windowWidth: React.PropTypes.number.isRequired,
  windowHeight: React.PropTypes.number.isRequired
}

const EventsTableConnected = connect(mapStoreToProps)(EventsTable)

const EventsTableWrapped = (props) =>
  <WindowSizeProvider>
    <EventsTableConnected {...props} />
  </WindowSizeProvider>

export default Relay.createContainer(EventsTableWrapped, {
  fragments: {
    currentUser: () => Relay.QL`
      fragment on User {
        ${ActionCell.getFragment('currentUser')}
      }
    `,
    events: () => Relay.QL`
      fragment on EventConnection {
        ${HeaderSelectCell.getFragment('events')}
        edges {
          node {
            ${SelectCell.getFragment('event')}
            ${ActionCell.getFragment('event')}
            ${EventIDLinkCell.getFragment('event')}
            ${StartDateCell.getFragment('event')}
            ${CreateDateCell.getFragment('event')}
            ${Object.keys(TC).map(compName => TC[compName].getFragment('event'))}
          }
        }
      }
    `
  }
})