import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, populate } from 'react-redux-firebase'
import {Card, CardTitle, CardText} from 'material-ui/Card';
import '../styles/MessageList.css'

const populates = [
  { child: 'dietitianId', root: 'dietitians' },
  { child: 'userId', root: 'users' },
]

const populates2 = [
  { childPopulates: [{ child: 'fromId', root: 'users' }] }
]

const enhance = compose(
  firebaseConnect([
    { path: 'chats', populates },
    { path: 'messages', populates: populates2 },
    { path: 'users' },
  ]),
  connect(({ firebase }) => ({
      chats: populate(firebase, 'chats', populates),
      messages: populate(firebase, 'messages', populates: populates2),
      users: firebase.data.users,
    })
  )
);

const Posts = ({chats, messages, users}) => {
  if (chats === undefined || messages === undefined || users === undefined) {
    return (<article>wait</article>);
  }

  const cards = Object.keys(chats).map(key => {
    var msgContents = null;
    if (key in messages) {
      msgContents = Object.keys(messages[key]).map(msgKey => {
        const msg = messages[key][msgKey];
        return (
          <div key={msgKey}>
            [{timeSince(new Date(msg.timestamp*1000))}] {users[msg.fromId] ? users[msg.fromId].name : ""} {msg.content}
          </div>
        )}
      );
    }

    return (
      <Card key={key} className="card">
        <CardTitle className="title" title={chats[key].dietitianId.name + " - " + chats[key].userId.name} />
        <CardText>
          {msgContents}
        </CardText>
      </Card>
    );
  });

  return (
    <div>
      {cards}
    </div>
  );
};

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
    return interval + " dakıka önce";
  }
  return Math.floor(seconds) + " saniye önce";
}

export default enhance(Posts)