import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import firebase from '../firebase';
import _ from 'lodash';
import '../styles/MessageList.css'

class MessageList extends Component {

  constructor(props, context) {
    super(props, context);

    this.state  = {
      chats: []
    }

    firebase.database().ref('chats').once('value', snapshot => {
      this.getData(snapshot.val());
    })
  }

  getValue(val, def) {
    return val !== undefined ? val : def;
  }

  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          cloned.information = this.getValue(cloned.information, {});
                          cloned.information.gender = this.getValue(cloned.information.gender, "");
                          cloned.information.height = this.getValue(cloned.information.height, "");
                          cloned.information.weight = this.getValue(cloned.information.weight, "");
                          cloned.appVersion = this.getValue(cloned.appVersion, "");

                          return cloned;
                      })
                      .value();
      this.setState({
        messages: messages
      });
  }

  render() {
    return (
      <div>
        <Card class="card">
          <CardHeader
            title="Without Avatar"
            subtitle="Subtitle"
            actAsExpander={false}
            showExpandableButton={false}
            />
          <CardTitle class="title" title="Card title" subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default MessageList;