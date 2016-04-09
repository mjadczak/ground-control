import React from 'react'
import ReactDOM from 'react-dom'
import {Cell} from 'fixed-data-table'

let defaultStyle = {
  fontFamily: 'Roboto',
    fontSize: '13px',
    lineHeight: '18px'
}

const BodyCell = ({style, ...props}) => (
  <Cell {...props}
    style={{...defaultStyle, ...style}}
  />
)

export default BodyCell
