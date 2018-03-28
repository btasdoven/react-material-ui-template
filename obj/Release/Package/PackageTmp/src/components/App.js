import React, { Component } from 'react';
import '../styles/App.css';

import { Switch, Route, Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { ResponsiveDrawer, BodyContainer } from 'material-ui-responsive-drawer'

import Main from './Main';
import LoginPage from './LoginPage';
import DietitianList from './DietitianList';
import UserList from './UserList';
import MessageList from './MessageList';

class App extends Component {
  render() {
    return (
      <div>
          <ResponsiveDrawer>
              <MenuItem 
                  containerElement={<Link to='/'/>} 
                  primaryText="Home" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
              <MenuItem 
                  containerElement={<Link to='/schedule'/>}
                  primaryText="Mesajlar" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
              <MenuItem 
                  containerElement={<Link to='/dietitians'/>}
                  primaryText="Diyetisyenler" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
              <MenuItem 
                  containerElement={<Link to='/users'/>}
                  primaryText="Danisanlar" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
              <MenuItem 
                  containerElement={<Link to='/messages'/>}
                  primaryText="Test" 
                  leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                  />
          </ResponsiveDrawer>
          <BodyContainer>
              <Switch>
                  <Route exact path='/' component={Main}/>
                  <Route path='/schedule' component={LoginPage}/>
                  <Route path='/dietitians' component={DietitianList}/>
                  <Route path='/users' component={UserList}/>
                  <Route path='/messages' component={MessageList}/>
              </Switch>
          </BodyContainer>
      </div>
    )
  }
}

export default App;
