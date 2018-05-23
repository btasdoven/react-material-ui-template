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
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import AdminRoute, { isFirebaseAdmin, getFirebaseDietitianId } from '../Login/AdminRoute';

import { ThemeProvider, defaultTheme, 
  TextComposer, Row, AddIcon, TextInput, SendButton, Fill, Fit,
  MessageList, MessageGroup, MessageMedia, MessageTitle, MessageText, Message, MessageButton, MessageButtons } from '@livechat/ui-kit'


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

class MessageWrapper extends Component {

  render() {

    return (
      <ThemeProvider theme={defaultTheme}>
       <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: '100%',
          }}
        >
          <MessageList active >
            <MessageGroup
              avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
              onlyFirstWithMeta
            >
              <Message authorName="Jon Smith" date="21:37" showMetaOnClick>
                <MessageMedia>
                  <img src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png" />
                </MessageMedia>
              </Message>
              <Message authorName="Jon Smith" date="21:37">
                <MessageTitle title="Message title" subtitle="24h" />
                <MessageMedia>
                  <img src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png" />
                </MessageMedia>
                <MessageText>
                  The fastest way to help your customers - start chatting with visitors
                </MessageText>
                <MessageText>
                  The fastest way to help your customers - start chatting with visitors
                  who need your help using a free 30-day trial.
                </MessageText>
              </Message>
              <Message date="21:38" authorName="Jon Smith">
                <MessageText>Hi! I would like to buy those shoes</MessageText>
              </Message>
            </MessageGroup>
            <MessageGroup onlyFirstWithMeta>
              <Message date="21:38" isOwn={true} authorName="Visitor">
                <MessageText>
                  I love them
                  sooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                  much!
                </MessageText>
              </Message>
              <Message date="21:38" isOwn={true} authorName="Visitor">
                <MessageText>This helps me a lot</MessageText>
              </Message>
            </MessageGroup>
            <MessageGroup
              avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
              onlyFirstWithMeta
            >
              <Message authorName="Jon Smith" date="21:37">
                <MessageText>No problem!</MessageText>
              </Message>
              <Message
                authorName="Jon Smith"
                imageUrl="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
                date="21:39"
              >
                <MessageText>
                  The fastest way to help your customers - start chatting with visitors
                  who need your help using a free 30-day trial.
                </MessageText>
              </Message>
              <Message authorName="Jon Smith" date="21:39">
                <MessageMedia>
                  <img src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png" />
                </MessageMedia>
              </Message>
            </MessageGroup>
          </MessageList>
          </div>
          <TextComposer defaultValue="Hello, can you help me?" style={{bottom: 0}}>
            <Row align="center">
              <Fit>
                <IconButton><AddIcon/></IconButton>
              </Fit>
              <Fill><TextInput/></Fill>
              <Fit><SendButton/></Fit>
            </Row>
          </TextComposer>
        </div>
      </ThemeProvider>
    );

    var chats = this.props.chats;
    var messages = this.props.messages;
    var users = this.props.users;
    var dietitians = this.props.dietitians;

    if (chats === undefined || messages === undefined || users === undefined || dietitians === undefined) {
      return (<LoadingIcon />);
    }

    var uid = getFirebaseDietitianId(this.props.auth);

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
      
      var msgContents = msgKeys.map(msgKey => {
        const msg = messages[key][msgKey];
        return (
          <div key={msgKey}>
            {msg.isSeen ? "[Okundu]" : ""}[{timeSince(new Date(timestampToInt(msg.timestamp)*1000))}][{users[msg.fromId] ? users[msg.fromId].name : ""}] {msg.content}
          </div>
        )}
      );

      var msgPreviews = msgKeys.map(msgKey => {
        const msg = messages[key][msgKey];
        return (<span> {timeSince(new Date(timestampToInt(msg.timestamp)*1000))}: {msg.content} <br/></span>);
      });//.filter(m => m !== undefined || m !== '').slice(1,3);

      if (msgContents == null || msgContents.length == 0) {
        return;
      }

      var u1 = dietitians[chats[key].dietitianId] || users[chats[key].dietitianId];
      var u2 = dietitians[chats[key].userId] || users[chats[key].userId];

      return (
        <div>
          <ListItem
            key={key}
            leftAvatar={<Avatar src={u2.profileImageUrl || u1.profileImageUrl} />}
            rightIconButton={rightIconMenu}
            primaryText={u2.name}
            secondaryText={
              msgPreviews     
            }
            secondaryTextLines={3}
          />
          <Divider />
        </div>
      );
    });

    return (
      <List>
        {cards.slice(1, 25)}
      </List>
    );
  }
}

function timestampToInt(ts){
  var t = parseInt(ts) || 0;

  if (t < 1485592994) {
    return t*10;
  }

  return t;
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

export default enhance(MessageWrapper)