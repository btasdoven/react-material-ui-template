import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { Route, Redirect } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { getFirebaseDietitianId } from '../Login/AdminRoute';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import AppBar from 'material-ui/AppBar';
import ProfileMenuItem from '../Login/ProfileMenuItem'

const ProfileAppBar = ({ firebase, auth, dietitians, history }) => {
  if (!isLoaded(auth) || isEmpty(auth) || dietitians === undefined) {
    return ;
  }

  var uid = getFirebaseDietitianId(auth.uid);
  var profile = dietitians[uid];

  if (profile === undefined) {
    return
  }

  return (
    <div>
        <ResponsiveAppBar 
            iconElementRight={
                    <FlatButton label="Default" />
            }
        />
    </div>
  )
}

export default compose(
  withRouter,
  firebaseConnect({ path: 'dietitians' }),
  connect(({ firebase }) =>({
    auth: firebase.auth,
    dietitians: firebase.data.dietitians,
  })),
)(ProfileAppBar)