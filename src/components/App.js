import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import '../styles/App.css';
import firebase from '../firebase';
import LoadingIcon from './Common/LoadingIcon';

import { Switch, Route, Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { ResponsiveDrawer, BodyContainer } from 'material-ui-responsive-drawer'

import PrivateRoute from './Login/PrivateRoute';
import AdminRoute, { isFirebaseAdmin, getFirebaseDietitianId } from './Login/AdminRoute';

import Main from './Main';
import ClientList from './Dietitian/ClientList';
import Client from './Dietitian/Client';
import DietitianList from './DietitianList';
import UserList from './UserList';
import MessageList from './MessageList';
import DietitianMessageList from './Dietitian/MessageList';
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

    if (this.props.auth === undefined) {
        return ( <LoadingIcon /> );
    }

    var isAdmin = isFirebaseAdmin(this.props.auth);

    return (
      <div>
          <ResponsiveDrawer>
            <ProfileMenuItem />
            <List>
              <ListItem 
                  containerElement={<Link to='/'/>} 
                  primaryText="Ana Sayfa" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
              <ListItem 
                containerElement={<Link to='/me/clients'/>} 
                primaryText="Danisamlarim" 
                leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                />
              <ListItem 
                containerElement={<Link to='/me/messages'/>} 
                primaryText="Mesajlarim" 
                leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                />
            </List>
            {isAdmin  
                ? <List>
                    <Subheader>Admin Baglantilari</Subheader>
                    <ListItem 
                        containerElement={<Link to='/messages'/>}
                        primaryText="Tum Mesajlar" 
                        leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                        />
                    <ListItem 
                        containerElement={<Link to='/dietitians'/>}
                        primaryText="Tum Diyetisyenler" 
                        leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                        />
                    <ListItem 
                        containerElement={<Link to='/users'/>}
                        primaryText="Tum Danisanlar" 
                        leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                        />
                </List> 
                : <div />
            }
          </ResponsiveDrawer>
          <BodyContainer>
              <Switch>
                <PrivateRoute exact path='/' component={Main}/>
                <PrivateRoute path='/me/messages' component={DietitianMessageList}/>
                <PrivateRoute exact path='/me/clients' component={ClientList}/>
                <PrivateRoute path='/me/clients/:clientId' component={Client} />
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
