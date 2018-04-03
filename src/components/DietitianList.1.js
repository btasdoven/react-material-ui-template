/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import Table, { TableBody, TableRowColumn, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import firebase from '../firebase';
import _ from 'lodash';

class Dietitian1List extends Component {
  constructor(props, context) {
    super(props, context);

    this.state  = {
      messages: []
    }

    firebase.database().ref('dietitians').once('value', snapshot => {
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
      <Paper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Gender</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Height (cm)</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Weight (kg)</TableHeaderColumn>
            <TableHeaderColumn numeric="true">App Version</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.messages.map(n => {
            return (
              <TableRow key={n.key}>
                <TableRowColumn>{n.key}</TableRowColumn>
                <TableRowColumn>{n.name}</TableRowColumn>
                <TableRowColumn numeric="true">{n.information.gender}</TableRowColumn>
                <TableRowColumn numeric="true">{n.information.height}</TableRowColumn>
                <TableRowColumn numeric="true">{n.information.weight}</TableRowColumn>
                <TableRowColumn numeric="true">{n.appVersion}</TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </Paper>
    );
  }
}

export default Dietitian1List;