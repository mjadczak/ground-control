import React from 'react'
import ReactDOM from 'react-dom'

export default class WindowSizeProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  }

  componentDidMount = () => window.addEventListener('resize', this._handleResize)
  componentWillUnmount = () => window.removeEventListener('resize', this._handleResize)

  _handleResize = (e) => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  }

  render = () => this.props.children

  static childContextTypes = {
    windowWidth: React.PropTypes.number,
    windowHeight: React.PropTypes.number
  }

  getChildContext = () => this.state
}