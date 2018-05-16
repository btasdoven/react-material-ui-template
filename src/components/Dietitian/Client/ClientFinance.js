import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebase, firebaseConnect, populate } from 'react-redux-firebase'
import {Card, CardTitle, CardText, CardHeader, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import Subheader from 'material-ui/Subheader';
import { Grid, Row, Col } from 'react-flexbox-grid';
import NavigationClose from 'material-ui/svg-icons/navigation/chevron-left';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import PrintIcon from 'material-ui/svg-icons/action/print';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';
import {Tabs, Tab} from 'material-ui/Tabs';

import '../../../styles/MessageList.css'
import ClientDetails from './ClientDetails'
import LoadingIcon from '../../Common/LoadingIcon';
import {indigo500} from 'material-ui/styles/colors';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Moment from 'react-moment';
import 'moment/locale/tr';

let DateTimeFormat;

const enhance = compose(
  withRouter,
  firebaseConnect([
    { path: 'users' },
  ]),
  connect(({ firebase }) => ({
      users: firebase.data.users,
    })
  )
);

const changeHandler = (target, formattedNumber, selectedCountry, rawValue) => {
  console.log(`${formattedNumber} - ${rawValue}`, 'Formatted value and raw value')
}

class ClientFinance extends React.PureComponent {

  constructor(props) {
    super(props)

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);

    this.state = { inputs: {}, activityFrequency: 1};
  }

  sendMessage(evt, chatKey) {
    if (this.state.inputs[chatKey] === '') {
        return;
    }

    var toId = this.props.chats[chatKey].dietitianId == "chatfeedback"
      ? this.props.chats[chatKey].userId
      : this.props.chats[chatKey].dietitianId;

    this.props.firebase.push(`/messages/${chatKey}`, {
      type: "text",
      content: this.state.inputs[chatKey],
      isSeen: false,
      timestamp: parseInt(new Date().getTime()/1000),
      toId: toId,
      fromId: 'chatfeedback'
    });

    this.state.inputs[chatKey] = "";
    this.setState(this.state);
  }

  updateInputValue(key, {target}) {
    this.setState(({inputs}) => {
      inputs[key] = target.value;
      return inputs;
    });
  }

  handleKeyPress(chatKey, {key}) {
    if (key === 'Enter') {
        this.sendMessage(null, chatKey);
    }
  }

  handleChange(event, index, value) {
    this.setState({activityFrequency: value});
  } 

  render() {

    if (this.props.users === undefined) {
      return (<LoadingIcon />);
    }

    var uid = this.props.match.params.clientId;
    var u = this.props.users[uid];
    u.information = u.information === undefined ? {} : u.information;
    
    return (
      <div>
        <Card className="card">
          <CardText>
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Tarih</TableHeaderColumn>
                  <TableHeaderColumn>Danışan</TableHeaderColumn>
                  <TableHeaderColumn>Toplam Ücret</TableHeaderColumn>
                  <TableHeaderColumn>Ödenen Ücret</TableHeaderColumn>
                  <TableHeaderColumn>Yorumlar</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn><Moment locale="tr" format="D MMMM YYYY dddd">2018-05-11T12:59-0500</Moment></TableRowColumn>
                  <TableRowColumn>Deniz Akyurt</TableRowColumn>
                  <TableRowColumn>350 TL</TableRowColumn>
                  <TableRowColumn>350 TL</TableRowColumn>
                  <TableRowColumn>1. seansın ücreti</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn><Moment locale="tr" format="D MMMM YYYY dddd">2018-05-12T12:59-0500</Moment></TableRowColumn>
                  <TableRowColumn>Murat Güneş</TableRowColumn>
                  <TableRowColumn>250 TL</TableRowColumn>
                  <TableRowColumn>250 TL</TableRowColumn>
                  <TableRowColumn>2. seansın ücreti</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn><Moment locale="tr" format="D MMMM YYYY dddd">2018-05-24T12:59-0500</Moment></TableRowColumn>
                  <TableRowColumn>Deniz Akyurt</TableRowColumn>
                  <TableRowColumn>250 TL</TableRowColumn>
                  <TableRowColumn>250 TL</TableRowColumn>
                  <TableRowColumn>2. seansın ücreti</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn><Moment locale="tr" format="D MMMM YYYY dddd">2018-05-25T12:59-0500</Moment></TableRowColumn>
                  <TableRowColumn>Murat Güneş</TableRowColumn>
                  <TableRowColumn>250 TL</TableRowColumn>
                  <TableRowColumn>250 TL</TableRowColumn>
                  <TableRowColumn>3. seansın ücreti</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn><Moment locale="tr" format="D MMMM YYYY dddd">2018-06-09T12:59-0500</Moment></TableRowColumn>
                  <TableRowColumn>Murat Güneş</TableRowColumn>
                  <TableRowColumn>250 TL</TableRowColumn>
                  <TableRowColumn>0 TL</TableRowColumn>
                  <TableRowColumn>4. seansın ücreti (EFT yapacak)</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default enhance(ClientFinance)