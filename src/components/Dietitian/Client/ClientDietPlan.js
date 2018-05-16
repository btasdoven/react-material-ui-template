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

class ClientDietPlan extends React.PureComponent {

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
        <Card className="card">
          <CardText>
            <Grid fluid style={{width: '100%'}}>
              <Row>
                <Col xs={12} md={4} lg={4}>
                  <AutoComplete hintText="Yiyecek ekle" filter={AutoComplete.fuzzyFilter} dataSource={dataSource1} maxSearchResults={5}/>
                </Col>
                <Col xs={12} md={4} lg={4}>
                  <h3>18 Mayıs 2018 - 25 Mayıs 2018</h3>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <RaisedButton label="Otomatik Hazırla" primary={true} style={{marginRight: 12}} />
                    <RaisedButton label="Kayıtlı Diyetlerimden Seç" primary={true} />
                </Col>
              </Row>
            </Grid>
            <Table selectable={false}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
                <TableRow>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn>Pazartesi</TableHeaderColumn>
                  <TableHeaderColumn>Sali</TableHeaderColumn>
                  <TableHeaderColumn>Carsamba</TableHeaderColumn>
                  <TableHeaderColumn>Persembe</TableHeaderColumn>
                  <TableHeaderColumn>Cuma</TableHeaderColumn>
                  <TableHeaderColumn>Cumartesi</TableHeaderColumn>
                  <TableHeaderColumn>Pazar</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Kahvalti</TableHeaderColumn>
                  <TableHeaderColumn>
                    {chipBadem}
                    {chipYumurta}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    {chipYumurta}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn>
                    {chipBadem}
                    {chipYumurta}
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>1. Ara Öğün</TableHeaderColumn>
                  <TableHeaderColumn>
                    {chipBadem}
                    {chipYumurta}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    {chipBadem}
                    {chipYumurta}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    {chipBadem}
                    {chipBadem}
                    {chipBadem}
                    {chipBadem}
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    {chipBadem}
                    {chipYumurta}</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>Öğle Yemeği</TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    {chipBadem}
                    {chipYumurta}</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>2. Ara Öğün</TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>Akşam Yemeği</TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                  </TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableBody>
            </Table>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default enhance(ClientDietPlan)