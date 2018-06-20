import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebase, firebaseConnect, populate } from 'react-redux-firebase'
import {Card, CardTitle, CardText, CardHeader, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import '../../styles/MessageList.css'
import LoadingIcon from '../Common/LoadingIcon';
import ProfileAppBar from '../Common/ProfileAppBar';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import AdminRoute, { isFirebaseAdmin, getFirebaseDietitianId } from '../Login/AdminRoute';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const enhance = compose(
  firebaseConnect([
    { path: 'chats' },
    { path: 'messages' },
    { path: 'users' },
    { path: 'dietitians' },
  ]),
  connect(({ firebase }) => ({
      auth: firebase.auth,
      chats: firebase.data.chats,
      messages: firebase.data.messages,
      users: firebase.data.users,
      dietitians: firebase.data.dietitians,
    })
  )
);

function timestampToInt(ts){
  var t = parseInt(ts) || 0;

  if (t < 1485592994) {
    return t*10;
  }

  return t;
}

class MessageList extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    var chats = this.props.chats;
    var messages = this.props.messages;
    var users = this.props.users;
    var dietitians = this.props.dietitians;

    if (chats === undefined || messages === undefined || users === undefined || dietitians === undefined) {
      return (<LoadingIcon />);
    }

    var uid = getFirebaseDietitianId(this.props.auth.uid);

    var chatKeys = Object.keys(chats).filter(k => {
      return k in messages && k in chats && 
        (chats[k].userId === uid || chats[k].dietitianId === uid);
    });
    
    chatKeys.sort(function(l, r) {
      var lvList = Object.keys(messages[l]).map(k => timestampToInt(messages[l][k].timestamp)).sort();
      var rvList = Object.keys(messages[r]).map(k => timestampToInt(messages[r][k].timestamp)).sort();
      var lv = lvList[lvList.length-1];
      var rv = rvList[rvList.length-1];
      return rv - lv;
    });

    const cards = chatKeys.map(key => {
      if (!(key in messages)) {
        return;
      }

      var msgKeys = Object.keys(messages[key]).sort(function(l,r) {
        var lv = timestampToInt(messages[key][l].timestamp);
        var rv = timestampToInt(messages[key][r].timestamp);
        return rv - lv;
      });

      var msgPreviews = msgKeys.map(msgKey => {
        const msg = messages[key][msgKey];
        return (<span key={key}> {timeSince(new Date(timestampToInt(msg.timestamp)*1000))}: {msg.content} <br/></span>);
      }).filter(m => m !== undefined || m !== '').slice(0,2);

      if (msgPreviews == null || msgPreviews.length == 0) {
        return;
      }

      var u1 = dietitians[chats[key].dietitianId] || users[chats[key].dietitianId];
      var u2 = dietitians[chats[key].userId] || users[chats[key].userId];

      return (
        <div key={key}>
          <ListItem
            leftAvatar={<Avatar src={u2.profileImageUrl || u1.profileImageUrl} />}
            rightIconButton={rightIconMenu}
            primaryText={u2.name}
            secondaryText={
              msgPreviews     
            }
            secondaryTextLines={1}
            onClick={() => this.props.history.push("/me/messages/" + key)}
          />
          <Divider />
        </div>
      );
    });

    return (
      <div> 
        <ProfileAppBar title="Mesajlarım"/>
        {/* <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle firstChild={true} text="Mesajlarım" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            <RaisedButton label="Yeni Mesaj Gönder" primary={true} />
          </ToolbarGroup>
        </Toolbar> */}

        <List>
          {cards.slice(0, 25)}
        </List>
      </div>
    );
  }
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " yıl önce";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " ay önce";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " gün önce";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " saat önce";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " dakika önce";
  }
  return Math.floor(seconds) + " saniye önce";
}

export default enhance(MessageList)