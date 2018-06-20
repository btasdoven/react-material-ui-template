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
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { getFirebaseDietitianId } from '../Login/AdminRoute';

import ProfileAppBar from '../Common/ProfileAppBar'

import '../../styles/MessageList.css'
import LoadingIcon from '../Common/LoadingIcon';
import {indigo500} from 'material-ui/styles/colors';

import CreditCardInput from 'react-credit-card-input';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let DateTimeFormat;

const enhance = compose(
  withRouter,
  firebaseConnect([
    { path: 'auth' },
    { path: 'dietitians' },
  ]),
  connect(({ firebase }) => ({
      dietitians: firebase.data.dietitians,
      auth: firebase.auth,
    })
  )
);

const changeHandler = (target, formattedNumber, selectedCountry, rawValue) => {
  console.log(`${formattedNumber} - ${rawValue}`, 'Formatted value and raw value')
}

class Client extends React.PureComponent {

  constructor(props) {
    super(props)

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);

    this.state = { inputs: {}, activityFrequency: 1, cc: {}};
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

    if (this.props.dietitians === undefined || this.props.auth === undefined) {
      return (<LoadingIcon />);
    }


    var uid = getFirebaseDietitianId(this.props.auth.uid);
    var u = this.props.dietitians[uid];

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
    
    var messages = [{
      message:'How do I use this messaging app?',
      from: 'right',
      backColor: '#3d83fa',
      textColor: "white",
      avatar: 'https://www.seeklogo.net/wp-content/uploads/2015/09/google-plus-new-icon-logo.png',
      duration: 2000,
    }];

    if (this.state.cc === null || this.state.cc === undefined) {
      this.state.cc = { number: "4512 1322 1544 5466", expiry: "12 / 19", cvc: "356"}
    }

    var that = this;
    var ccNoProps = {
      onChange: function(e) {
        that.setState({cc: {number: e.target.value}});
      }, 
      value: that.state.cc.number,
    }
    var ccExpProps = {
      onChange: function(e) {
        that.setState({cc: {expiry: e.target.value}});
      }, 
      value: that.state.cc.expiry,
    }
    var ccCvcProps = {
      onChange: function(e) { 
        that.setState({cc: {cvc: e.target.value}});
      }, 
      value: that.state.cc.cvc,
    }
    
    return (
      <div>
        <ProfileAppBar title="Profilim"/>
        {/* <Toolbar>
          <ToolbarGroup firstChild={true}>
            <Avatar style={{marginRight: "25px"}} src={"/static/default_avatar.png"} />
            <ToolbarTitle text={u.name} />
          </ToolbarGroup>
        </Toolbar> */}
        {/* <AppBar
          title={
              <ListItem
                leftAvatar={
                  <Avatar src={u.profileImageUrl || "/static/default_avatar.png"} />
                }>
                {u.name}
              </ListItem>}
          iconElementLeft={<IconButton onClick={() => this.props.history.push('/me/clients')}><NavigationClose /></IconButton>}
        /> */}
      <Card key={uid} className="card">
        <CardText>
            <h3>Kisisel Bilgiler</h3>
            <Grid fluid>
              <Row>
                <Col xs={12} md={6} lg={6}>
                  <TextField floatingLabelText="Isim ve soyisim" required={true} value={u.name} /><br />
                  <TextField floatingLabelText="E-posta adresi" type="email" value={u.email} /><br />
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <TextField floatingLabelText="Telefon No." type="tel" size={11} /> <br />
                  <DatePicker 
                    floatingLabelText="Dogum tarihi"
                     openToYearSelection={true} locale="tr-TR"
                    DateTimeFormat={DateTimeFormat}
                    okLabel="Onayla"
                    cancelLabel="Vazgec"
                    minDate={new Date('1940-01-01')}
                    maxDate={new Date('2019-01-01')} />
                </Col>
              </Row>
            </Grid>
            <h3>Vücut Bilgileri ve Alışkanlıklar</h3>
            <Grid fluid>
              <Row>
                <Col xs={12} md={6} lg={6}>
                  <SelectField
                    floatingLabelText="Spor Aliskanliklari"
                    value={this.state.activityFrequency}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={1} primaryText="Hic yapmaz" />
                    <MenuItem value={2} primaryText="Haftada 1-2 gun yapar" />
                    <MenuItem value={3} primaryText="Haftada 3-4 gun yapar" />
                    <MenuItem value={4} primaryText="Her gun yapar" />
                  </SelectField> <br />

                  <TextField floatingLabelText="Isim ve soyisim" required={true} value={u.name} /><br />
                  <TextField floatingLabelText="E-posta adresi" type="email" value={u.email} /><br />
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <TextField floatingLabelText="Telefon No." type="tel" size={11} /> <br />
                </Col>
              </Row>
            </Grid>
          </CardText>
        </Card>

      <Card key={uid + "-kk"} className="card">
        <CardText>
            <h3>Kredi Kartı Bilgilerim</h3>
            <Grid fluid>
              <Row>
                <Col xs={12} md={6} lg={6}> 
                <CreditCardInput
                  cardNumberInputProps={ccNoProps}
                  cardExpiryInputProps={ccExpProps}
                  cardCVCInputProps={ccCvcProps}
                />
                </Col>
                <Col xs={12} md={6} lg={6}>
                </Col>
              </Row>
            </Grid>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default enhance(Client)