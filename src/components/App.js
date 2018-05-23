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

import ClientList from './Dietitian/ClientList';
import Profile from './Dietitian/Profile';
import Client from './Dietitian/Client/Client';
import Agenda from './Dietitian/Agenda';
import Finance from './Dietitian/Finance';
import Settings from './Dietitian/Settings';
import SavedDietList from './Dietitian/SavedDietList';
import DietitianMessageList from './Dietitian/MessageList';
import DietitianMessage from './Dietitian/Message';

import Dashboard from './Dashboard/Dashboard.js';
import DietitianList from './DietitianList';
import UserList from './UserList';
import MessageList from './MessageList';
import ProfileMenuItem from './Login/ProfileMenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PropTypes from 'prop-types';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
      static propTypes = {
        children: PropTypes.node.isRequired,
        defaultValue: PropTypes.string.isRequired,
      };
  
      componentWillMount() {
        this.setState({
          selectedIndex: this.props.defaultValue,
        });
      }
  
      handleRequestChange = (event, index) => {
        this.setState({
          selectedIndex: index,
        });
      };
  
      render() {
        return (
          <ComposedComponent
            value={this.state.selectedIndex}
            onChange={this.handleRequestChange}
          >
            {this.props.children}
          </ComposedComponent>
        );
      }
    };
}

SelectableList = wrapState(SelectableList);

class App extends Component {
  render() {
    if (this.props.auth === undefined || this.props.dietitians === undefined) {
        return ( <LoadingIcon /> );
    }

    var isAdmin = isFirebaseAdmin(this.props.auth);

    var uid = getFirebaseDietitianId(this.props.auth.uid);

    var isAuthorizedUser = this.props.dietitians[uid] !== undefined;

    if (!isAdmin && !isAuthorizedUser) {
        this.props.firebase.logout();
        this.props.history.push('/');
        alert("Bu e-posta adresi sistemimizde diyetisyen olarak kayitli degildir.");
        window.location.reload();
        return;
    }

    return (
      <div>
          <ResponsiveDrawer>
            <ProfileMenuItem />
            <SelectableList defaultValue={this.props.location.pathname}>
                <ListItem 
                    value='/'
                    containerElement={<Link to='/'/>} 
                    primaryText="Ana Sayfa" 
                    leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>}
                    />
                <ListItem 
                    value='/me/clients'
                    containerElement={<Link to='/me/clients'/>} 
                    primaryText="Danışanlarım" 
                    leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                    />              
                <ListItem 
                    value='/me/messages'
                    containerElement={<Link to='/me/messages'/>} 
                    primaryText="Mesajlarım" 
                    leftIcon={<FontIcon className="material-icons">email</FontIcon>}
                    rightIcon={<Badge badgeContent={2} secondary={true}></Badge>} 
                    />
                <ListItem 
                    value='/me/agenda'
                    containerElement={<Link to='/me/agenda'/>} 
                    primaryText="Randevularım" 
                    leftIcon={<FontIcon className="material-icons">calendar_today</FontIcon>}
                    />
                <Divider/>
                <ListItem 
                    value='/me'
                    containerElement={<Link to='/me'/>} 
                    primaryText="Profilim" 
                    leftIcon={<FontIcon className="material-icons">person</FontIcon>}
                    />
                <ListItem 
                    value='/me/finance'
                    containerElement={<Link to='/me/finance'/>}
                    primaryText="Finanslarım" 
                    leftIcon={<FontIcon className="material-icons">credit_card</FontIcon>}
                    />
                <ListItem 
                    value='/me/diets'
                    containerElement={<Link to='/me/diets'/>}
                    primaryText="Kayıtlı Diyetlerim" 
                    leftIcon={<FontIcon className="material-icons">assignment</FontIcon>}
                    />
                <ListItem 
                    value='/me/settings'
                    containerElement={<Link to='/me/settings'/>}
                    primaryText="Ayarlar" 
                    leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
                    />
            </SelectableList>
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
                <PrivateRoute exact path='/' component={Dashboard}/>

                <PrivateRoute exact path='/me' component={Profile}/>
                <PrivateRoute exact path='/me/messages' component={DietitianMessageList}/>
                <PrivateRoute path='/me/messages/:messageId' component={DietitianMessage}/>

                <PrivateRoute exact path='/me/clients' component={ClientList}/>
                <PrivateRoute path='/me/clients/:clientId' component={Client} />

                <PrivateRoute path='/me/agenda' component={Agenda}/>
                <PrivateRoute path='/me/finance' component={Finance}/>
                <PrivateRoute path='/me/settings' component={Settings}/>
                <PrivateRoute path='/me/diets' component={SavedDietList}/>

                <AdminRoute path='/dietitians' component={DietitianList}/>
                <AdminRoute path='/users' component={UserList}/>
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
