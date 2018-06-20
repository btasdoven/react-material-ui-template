import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import { getFirebaseDietitianId } from '../Login/AdminRoute';
//import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import ResponsiveAppBar from './ResponsiveAppBarNext'
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const ProfileAppBar = ({ firebase, auth, dietitians, history, title }) => {
  if (!isLoaded(auth) || isEmpty(auth) || dietitians === undefined) {
    return ;
  }

  var uid = getFirebaseDietitianId(auth.uid);
  var profile = dietitians[uid];

  if (profile === undefined) {
    return
  }

  console.log(getMuiTheme());

  return (
    <div style={{paddingBottom: getMuiTheme().spacing.desktopKeylineIncrement}}>
        {/* <ResponsiveAppBar
          title={title}
          iconElementRight={
            <IconMenu
              iconButtonElement={<IconButton style={{marginTop: -6}} iconStyle={{width: 36, height:36}}><Avatar src={profile.profileImageUrl} /></IconButton>}
            >
              <MenuItem primaryText="Profilim" leftIcon={<FontIcon className="material-icons">people</FontIcon>} onClick = {() => history.push("/me")} />
              <MenuItem primaryText="Çıkış" leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>} onClick = {() => {
                firebase.logout();
                history.push("/");
                window.location.reload();
              }} />
            </IconMenu>
          }
        /> */}
      <ResponsiveAppBar>
          <Typography variant="title" color="inherit" style={{flex: 1}}>
            {title}
          </Typography>
          {<div>
            <IconButton style={{marginTop: -4}} iconStyle={{width: 32, height:32}}><Avatar src={profile.profileImageUrl} /></IconButton>
            <Menu>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
            </Menu>
          </div>
          }
      </ResponsiveAppBar>
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