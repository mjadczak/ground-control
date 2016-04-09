import React from 'react'
import ReactDOM from 'react-dom'

export default function wrapStatelessComponent(statelessComponent) {
  return React.createClass({
    render() {
      return statelessComponent(this.props)
    }
  })
}