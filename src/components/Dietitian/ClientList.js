import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebase, firebaseConnect, populate } from 'react-redux-firebase'
import {Card, CardTitle, CardText, CardHeader, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom';

import '../../styles/MessageList.css'
import LoadingIcon from '../Common/LoadingIcon';

const enhance = compose(
  firebaseConnect([
    { path: 'users' },
  ]),
  connect(({ firebase }) => ({
      users: firebase.data.users,
    })
  )
);

class ClientList extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    var users = this.props.users;

    if (users === undefined) {
      return (<LoadingIcon />);
    }

    const cards = Object.keys(users).slice(1,10).map(key => {
      var u = users[key];
      return (
        <div key={key}>
          <ListItem
            primaryText={u.name}
            leftAvatar={<Avatar src={u.profileImageUrl || "/static/default_avatar.png"} />}
            onClick={() => this.props.history.push("/me/clients/" + key)}
          />
          <Divider />
        </div>
      );
    });

    return (
      <div>
        <AppBar
          title="Danisanlarim"
        />
      <List>
        {cards}
      </List>
      </div>
    );
  }
}

export default enhance(ClientList)