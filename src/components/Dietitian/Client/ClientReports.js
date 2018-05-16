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

class ClientReports extends React.PureComponent {

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

    const toolbarStyle = {
      backgroundColor: indigo500
    }

    if (areIntlLocalesSupported(['tr', 'tr-TR'])) {
      DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
      const IntlPolyfill = require('intl');
      DateTimeFormat = IntlPolyfill.DateTimeFormat;
      require('intl/locale-data/jsonp/tr');
      require('intl/locale-data/jsonp/tr-TR');
    }

    const data = [
      {name: '19 Mart', kilo: 78.6, pv: 4300, amt: 2100},
      {name: '26 Mart', kilo: 76.1, pv: 4300, amt: 2100},
      {name: '2 Nisan', kilo: 75.4, pv: 4300, amt: 2100},
      {name: '9 Nisan', kilo: 74.6, pv: 4300, amt: 2100},
      {name: '16 Nisan', kilo: 75, pv: 4300, amt: 2100},
      {name: '23 Nisan', kilo: 73.8, pv: 4300, amt: 2100},
    ];

    const data2 = [
      {name: '19 Mart', kilo: 26.1, pv: 4300, amt: 2100},
      {name: '26 Mart', kilo: 25.8, pv: 4300, amt: 2100},
      {name: '2 Nisan', kilo: 26.0, pv: 4300, amt: 2100},
      {name: '9 Nisan', kilo: 25.9, pv: 4300, amt: 2100},
      {name: '16 Nisan', kilo: 25.8, pv: 4300, amt: 2100},
      {name: '23 Nisan', kilo: 25.2, pv: 4300, amt: 2100},
    ];


    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    const dataSource1 = [
      {
        text: 'Badem',
        value: (
          <MenuItem
            primaryText="Badem"
            leftIcon={<Avatar src="https://www.sifalibitkitedavisi.com/wp-content/uploads/2015/01/badem.jpg" />}
          />
        ),
      },
      {
        text: 'Yumurta',
        value: (
          <MenuItem
            primaryText="Yumurta"
            leftIcon={<Avatar src="http://www.i2clipart.com/cliparts/a/a/5/1/clipart-egg-aa51.png" />}
          />
        ),
      },
    ];


    var chipBadem = <Chip style={styles.chip} onRequestDelete={() => void(0) } onClick={() => void(0)}>
      <Avatar src="https://www.sifalibitkitedavisi.com/wp-content/uploads/2015/01/badem.jpg" />Badem
    </Chip>;

    var chipYumurta = <Chip style={styles.chip} onRequestDelete={() => void(0) } onClick={() => void(0)}>
      <Avatar src="http://www.i2clipart.com/cliparts/a/a/5/1/clipart-egg-aa51.png" />Yumurta
    </Chip>;
    
    return (
      <div>
        <Grid fluid key={uid+"-2"}>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <Card className="card">
                <CardText>
                  <h3>Kilo Değişim Grafiği</h3>
                  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="kilo" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip />
                  </LineChart>
                </CardText>
              </Card>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <Card className="card">
                <CardText>
                  <h3>Vücut Kitle İndeksi Değişim Grafiği</h3>
                  <LineChart width={600} height={300} data={data2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="kilo" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis interval="preserveStartEnd" domain={['dataMin - 3', 'dataMax + 3']} />
                    <Tooltip />
                  </LineChart>
                </CardText>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default enhance(ClientReports)