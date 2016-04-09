import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import makeTextCell from './makeTextCell'

export const EventNameCell = makeTextCell({
  colName: 'name',
  relayFragment: Relay.QL`
    fragment on Event {
      name
    }
  `
})

export const EventDescriptionCell = makeTextCell({
  colName: 'description',
  transformer: desc => desc.replace(/(<([^>]+)>)|\\n/ig, ""),
  relayFragment: Relay.QL`
    fragment on Event {
      description
    }
  `
})

export const EventHostEmailCell = makeTextCell({
  colName: 'host.email',
  relayFragment: Relay.QL`
    fragment on Event {
      host {
        email
      }
    }
  `,
  accessor: event => event.host.email,
  transformer: email =>
    <a href={`mailto:${email}`}>{email}</a>
})

export const EventHostNameCell = makeTextCell({
  colName: 'host.name',
  relayFragment: Relay.QL`
    fragment on Event {
      host {
        firstName,
        lastName
      }
    }
  `,
  accessor: event => event.host,
  transformer: host => `${host.firstName} ${host.lastName}`
})

export const EventHostPhoneCell = makeTextCell({
  colName: 'contactPhone',
  relayFragment: Relay.QL`
    fragment on Event {
      contactPhone
    }
  `,
  accessor: event => event.contactPhone
})

export const EventDurationCell = makeTextCell({
  colName: 'duration',
  transformer: duration =>
    <span>
      {(duration / 60).toString().split('.')[0] + ' hours'}
      <br/>
      {duration % 60 + ' minutes'}
    </span>,
  relayFragment: Relay.QL`
    fragment on Event {
      duration
    }
  `
})

export const EventCapacityCell = makeTextCell({
  colName: 'capacity',
  relayFragment: Relay.QL`
    fragment on Event {
      capacity
    }
  `
})

export const AttendeesCountCell = makeTextCell({
  colName: 'attendeesCount',
  relayFragment: Relay.QL`
    fragment on Event {
      attendeesCount
    }
  `
})

export const VenueNameCell = makeTextCell({
  colName: 'venueName',
  relayFragment: Relay.QL`
    fragment on Event {
      venueName
    }
  `
})

export const VenueAddressCell = makeTextCell({
  colName: 'venueAddr1',
  relayFragment: Relay.QL`
    fragment on Event {
      venueAddr1
    }
  `
})

export const VenueCityCell = makeTextCell({
  colName: 'venueCity',
  relayFragment: Relay.QL`
    fragment on Event {
      venueCity
    }
  `
})

export const VenueStateCell = makeTextCell({
  colName: 'venueState',
  relayFragment: Relay.QL`
    fragment on Event {
      venueState
    }
  `
})

export const VenueZipCell = makeTextCell({
  colName: 'venueZip',
  relayFragment: Relay.QL`
    fragment on Event {
      venueZip
    }
  `
})

export const LatitudeCell = makeTextCell({
  colName: 'latitude',
  relayFragment: Relay.QL`
    fragment on Event {
      latitude
    }
  `
})

export const LongitudeCell = makeTextCell({
  colName: 'longitude',
  relayFragment: Relay.QL`
    fragment on Event {
      longitude
    }
  `
})