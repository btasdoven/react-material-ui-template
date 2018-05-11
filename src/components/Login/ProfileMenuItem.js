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
import LoadingIcon from '../Common/LoadingIcon';
import { Route, Redirect } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { getFirebaseDietitianId } from './AdminRoute';

const ProfileMenuItem = ({ firebase, auth, dietitians, history }) => {
  if (!isLoaded(auth) || isEmpty(auth) || dietitians === undefined) {
    return (<LoadingIcon />);
  }

  var uid = getFirebaseDietitianId(auth.uid);
  var profile = dietitians[uid];

  if (profile === undefined) {
    return (<LoadingIcon />);
  }

  return (
    <List>
      <ListItem 
        disabled={true}
        leftAvatar={
          <Avatar src={profile.profileImageUrl} />
        }
        primaryText={profile.name}
        rightIconButton={
          <IconButton
            iconStyle={{width: 24, height:24}}
            tooltip="Çıkış"
            onClick={() => {
              firebase.logout();
              history.push('/');
            }}>
            <FontIcon className="material-icons">exit_to_app</FontIcon>
          </IconButton>
          // <IconMenu
          //   iconButtonElement={<IconButton iconStyle={{width: 24, height:24}}><SettingsIcon /></IconButton>}
          //   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          //   targetOrigin={{horizontal: 'left', vertical: 'top'}}
          // >
          //   <MenuItem primaryText="Profilim" leftIcon={<FontIcon className="material-icons">people</FontIcon>} onClick = {() => history.push("/me")} />
          //   <MenuItem primaryText="Çıkış" leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>} onClick = {() => {
          //     firebase.logout();
          //     history.push("/");
          //     window.location.reload();
          //   }} />
          // </IconMenu>
        }
      />   
      <Divider />
    </List>
  )
}

export default compose(
  withRouter,
  firebaseConnect({ path: 'dietitians' }),
  connect(({ firebase }) =>({
    auth: firebase.auth,
    dietitians: firebase.data.dietitians,
  })),
)(ProfileMenuItem)