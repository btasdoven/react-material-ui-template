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
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import { Route, Redirect } from 'react-router-dom';

const ProfileMenuItem = ({ firebase, auth, dietitians, history }) => {
  if (!isLoaded(auth) || isEmpty(auth) || dietitians === undefined) {
    return (<CircularProgress />);
  }

  var uid = auth !== undefined && auth.uid === "B7Kpe30S9dclhsrkG3csRKxsT2C3" // for diyetkocumapp@gmail.com
    ? "chatfeedback"
    : auth.uid;
  
  var profile = dietitians[uid];

  if (profile === undefined) {
    firebase.logout();
    history.push('/');
    alert("Bu e-posta adresi sistemimizde diyetisyen olarak kayitli degildir.");
    window.location.reload();
    return;
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
            <ExitToApp />
          </IconButton>
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