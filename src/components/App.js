import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import '../styles/App.css';
import firebase from '../firebase';

import { Switch, Route, Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { ResponsiveDrawer, BodyContainer } from 'material-ui-responsive-drawer'

import PrivateRoute from './Login/PrivateRoute';
import AdminRoute, { isFirebaseAdmin } from './Login/AdminRoute';

import Main from './Main';
import DietitianList from './DietitianList';
import UserList from './UserList';
import MessageList from './MessageList';
import ProfileMenuItem from './Login/ProfileMenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';

class App extends Component {
  render() {

    var isAdmin = isFirebaseAdmin(this.props.auth);

    return (
      <div>
          <ResponsiveDrawer>
            <ProfileMenuItem />
            <List>
              <ListItem 
                  containerElement={<Link to='/'/>} 
                  primaryText="Home" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
            </List>
            <List style={isAdmin ? {} : {display:"none"}}>
              <Subheader>Admin Baglantilari</Subheader>
              <ListItem 
                  containerElement={<Link to='/messages'/>}
                  primaryText="Mesajlar" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
              <ListItem 
                  containerElement={<Link to='/dietitians'/>}
                  primaryText="Diyetisyenler" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
              <ListItem 
                  containerElement={<Link to='/users'/>}
                  primaryText="Danisanlar" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
            </List>
          </ResponsiveDrawer>
          <BodyContainer>
              <Switch>
                  <PrivateRoute exact path='/' component={Main}/>
                  <PrivateRoute path='/dietitians' component={DietitianList}/>
                  <PrivateRoute path='/users' component={UserList}/>
                  <AdminRoute path='/messages' component={MessageList}/>
              </Switch>
          </BodyContainer>
      </div>
    )
  }
}

export default compose(
    withRouter,
    firebaseConnect({ path: 'dietitians' }),
    connect(({ firebase }) =>({
        auth: firebase.auth,
        dietitians: firebase.data.dietitians,
    })),
)(App)
