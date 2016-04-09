import React from 'react'
import ReactDOM from 'react-dom'
import BodyCell from './BodyCell'
import Relay from 'react-relay'

export default function makeTextCell({colName, transformer = x => x, relayFragment, accessor = event => event[colName]}) {
  if (!colName) throw new Error(`makeTextCell called without a colName`)

  const TextCellInstance = ({event, ...props}) =>
    <BodyCell {...props}>
      {transformer(accessor(event))}
    </BodyCell>

  TextCellInstance.propTypes = {
    event: React.PropTypes.object.isRequired
  }

  TextCellInstance.displayName = `makeTextCell(${colName})`

  return Relay.createContainer(TextCellInstance, {
    fragments: {
      event: () => relayFragment
    }
  })
}