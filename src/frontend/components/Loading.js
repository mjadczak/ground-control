import React from 'react';
import Relay from 'react-relay';
import {Styles} from 'material-ui';
import TopNav from './TopNav';
import {BernieTheme} from './styles/bernie-theme';
import {BernieColors} from './styles/bernie-css';
import {CircularProgress} from 'material-ui';

export default class Loading extends React.Component {
  render() {
    return (

        <div style={{
        margin: '0 auto',
        width: 150,
        height: 150,
      }}>
          <CircularProgress mode="indeterminate" size={2}/>
        </div>

    )
  }
}