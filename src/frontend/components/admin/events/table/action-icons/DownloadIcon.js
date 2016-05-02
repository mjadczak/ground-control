import React from 'react'
import ReactDOM from 'react-dom'
import {IconButton, FontIcon} from 'material-ui'
import {BernieColors} from '../../../../styles/bernie-css'
import Relay from 'react-relay'
import {connect} from 'react-redux'
import json2csv from 'json2csv'

require('./spin.css') //Can't easily do this with inline React styles

class DownloadIcon extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired
  }

  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      loading: false
    }
  }

  handleClick = () => {
    this.setState({
      loading: true
    })
    this.props.relay.setVariables({
        needAttendees: true
      }, ready => console.log(ready, this.props.event))
      /*({done}) => {
        if (!done) return;

        const event = this.props.event;
        const data = event.attendees.map(
          (attendee) => JSON.flatten(attendee, {ignoreProps: ['__dataID__']})
        )
        let options = {
          data,
          fields: Object.keys(data[0])
        }

        json2csv(options, (err, csv) => {
          if (err) console.log(err);

          let byteNumbers = new Uint8Array(csv.length);

          for (let i = 0; i < csv.length; i++){
            byteNumbers[i] = csv.charCodeAt(i);
          }
          let blob = new Blob([byteNumbers], {type: "text/csv"});

          // Construct the uri
          let uri = URL.createObjectURL(blob);

          // Construct the <a> element
          let link = document.createElement("a");
          link.download = `Event RSVPs (${event.eventIdObfuscated}).csv`;
          link.href = uri;

          document.body.appendChild(link);
          link.click();

          // Cleanup the DOM
          document.body.removeChild(link);

          this.setState({
            loading: false
          })
          this.props.relay.setVariables({
            needAttendees: false
          })
        })*/
      // })
  }

  render = () => <IconButton
    title='make fast forward request'
    onTouchTap={this.handleClick}
    disabled={this.props.event.attendeesCount <= 0 || this.state.loading}
  >
    <FontIcon
      className={this.state.loading ? 'material-icons _admin_events_table_action-icons_FfwdIcon_spin' : 'material-icons'}
      color={this.props.event.isOfficial ? BernieColors.darkRed : null}
    >
      {this.state.loading ? 'loop' : 'file_download'}
    </FontIcon>
  </IconButton>
}

export default Relay.createContainer(DownloadIcon, {
  initialVariables: {
    needAttendees: false
  },
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        id
        attendeesCount
        attendees @include(if: $needAttendees) { 
          firstName
          lastName
          phone
          email
          address {
            city
            state
            zip
          }
        }
      }
    `
  }
})
