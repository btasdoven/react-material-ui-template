import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, populate } from 'react-redux-firebase'
import {Card, CardTitle, CardText} from 'material-ui/Card';

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
    { path: 'messages', populates: populates2 }
  ]),
  connect(({ firebase }) => ({
      chats: populate(firebase, 'chats', populates),
      messages: populate(firebase, 'messages', populates2),
    })
  )
);

const Posts = ({chats, messages}) => {
  if (chats === undefined || messages === undefined) {
    return (<article>wait</article>);
  }

  const cards = Object.keys(chats).map(key => {
    var msgContents = null;
    if (key in messages) {
      msgContents = Object.keys(messages[key]).map(msgKey => {
        const msg = messages[key][msgKey];
        return (
          <div>
            [{new Date(msg.timestamp*1000).toUTCString()}] {msg.fromId} {msg.content}
          </div>
        )}
      );
    }

    return (
      <Card class="card">
        <CardTitle class="title" title={chats[key].dietitianId.name + " - " + chats[key].userId.name} />
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

export default enhance(Posts)