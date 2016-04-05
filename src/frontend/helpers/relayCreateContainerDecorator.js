import Relay from 'react-relay'

export default function decorate(...params) {
  return function(component) {
    return Relay.createContainer(component, ...params)
  }
}