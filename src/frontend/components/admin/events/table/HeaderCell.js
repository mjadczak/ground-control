import React from 'react'
import ReactDOM from 'react-dom'
import {Cell} from 'fixed-data-table'

let defaultStyle = {
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontWeight: 400,
  color: '#9e9e9e'
}

const HeaderCell = ({style, ...props}) => (
  <Cell {...props}
    style={{...defaultStyle, ...style}}
  />
)

export default HeaderCell
  