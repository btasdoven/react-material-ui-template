import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';

import '../../styles/MessageList.css'
import LoadingIcon from '../Common/LoadingIcon';
import ProfileAppBar from '../Common/ProfileAppBar';

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
        <ProfileAppBar title="Danışanlarım"/>
        <List>
          {cards}
        </List>
      </div>
    );
  }
}

export default enhance(ClientList)