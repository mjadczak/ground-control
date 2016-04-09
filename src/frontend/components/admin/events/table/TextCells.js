import React from 'react'
import ReactDOM from 'react-dom'
import makeTextCell from './makeTextCell'

export const EventNameCell = makeTextCell({
  colName: 'name'
})

export const EventDescriptionCell = makeTextCell({
  colName: 'description',
  transformer: desc => desc.replace(/(<([^>]+)>)|\\n/ig, "")
})

export const EventHostEmailCell = makeTextCell({
  colName: 'host.email',
  relayPath: `host {
      email
    }
    `,
  accessor: event => event.host.email,
  transformer: email =>
    <a href={`mailto:${email}`}>{email}</a>
})

export const EventHostNameCell = makeTextCell({
  colName: 'host.name',
  relayPath: `host {
      firstName
      lastName
    }
    `,
  accessor: event => event.host,
  transformer: host => `${host.firstName} ${host.lastName}`
})

export const EventHostPhoneCell = makeTextCell({
  colName: 'host.contactPhone',
  relayPath: `host {
      contactPhone
    }
    `,
  accessor: event => event.host.contactPhone
})

export const EventDurationCell = makeTextCell({
  colName: 'duration',
  transformer: duration =>
    <span>
      {(duration / 60).toString().split('.')[0] + ' hours'}
      <br/>
      {duration % 60 + ' minutes'}
    </span>
})

export const EventCapacityCell = makeTextCell({
  colName: 'capacity'
})

export const AttendeesCountCell = makeTextCell({
  colName: 'attendeesCount'
})

export const VenueNameCell = makeTextCell({
  colName: 'venueName'
})

export const VenueAddressCell = makeTextCell({
  colName: 'venueAddr1'
})

export const VenueCityCell = makeTextCell({
  colName: 'venueCity'
})

export const VenueStateCell = makeTextCell({
  colName: 'venueState'
})

export const VenueZipCell = makeTextCell({
  colName: 'venueZip'
})

export const LatitudeCell = makeTextCell({
  colName: 'latitude'
})

export const LongitudeCell = makeTextCell({
  colName: 'longitude'
})