import React from 'react'
import ReactDOM from 'react-dom'
import BodyCell from './BodyCell'
import moment from 'moment'

const DateCell = ({utcOffset = 0, timezone = 'UTC', date, ...props}) => {
  let offsetDate    = moment(date).utcOffset(utcOffset)
  let formattedDate = offsetDate.format('l LT')

  return (
    <BodyCell {...props}>
      {formattedDate}<br />
      {timezone}
    </BodyCell>
  )
}

DateCell.propTypes = {
  utcOffset: React.PropTypes.number,
  timezone: React.PropTypes.string,
  date: React.PropTypes.string.isRequired
}

export default DateCell