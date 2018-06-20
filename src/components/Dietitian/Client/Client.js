import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import NavigationClose from 'material-ui/svg-icons/navigation/chevron-left';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProfileAppBar from '../../Common/ProfileAppBar'

import '../../../styles/MessageList.css'

import ClientDetails from './ClientDetails'
import ClientDietPlan from './ClientDietPlan'
import ClientData from './ClientData'
import ClientMessages from './ClientMessages'
import ClientReports from './ClientReports'
import ClientFinance from './ClientFinance'

import LoadingIcon from '../../Common/LoadingIcon';
import {indigo500} from 'material-ui/styles/colors';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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

class Client extends React.PureComponent {

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
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <IconButton onClick={() => this.props.history.push('/me/clients')}><NavigationClose /></IconButton>
            <Avatar style={{marginRight: "25px"}} src={u.profileImageUrl || "/static/default_avatar.png"} />
            <ToolbarTitle text={u.name} />
            <ToolbarSeparator />
            <FontIcon className="material-icons">print</FontIcon>
            <FontIcon className="material-icons">share</FontIcon>
            <FontIcon className="material-icons">chat</FontIcon>
            <FontIcon className="material-icons">payment</FontIcon>
            <FontIcon className="material-icons">history</FontIcon>
            <RaisedButton label="GÜNCELLE" primary={true} />
          </ToolbarGroup>
        </Toolbar>

        <Tabs>
          <Tab label="TEMEL BİLGİLER" >
            <ClientDetails/>
          </Tab>
          <Tab label="DİYET PLANI" >
            <ClientDietPlan/>
          </Tab>
          <Tab label="VERİLER" >
            <ClientData/>
          </Tab>
          <Tab label="RAPORLAR" >
            <ClientReports/>
          </Tab>
          <Tab label="MESAJLAR" >
            <ClientMessages/>
          </Tab>
          <Tab label="FİNANS" >
            <ClientFinance/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default enhance(Client)