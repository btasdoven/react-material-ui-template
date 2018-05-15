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

import '../../styles/MessageList.css'
import LoadingIcon from '../Common/LoadingIcon';
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
import moment from 'moment'
import 'moment/locale/tr'

moment.locale('tr');
BigCalendar.momentLocalizer(moment);

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

class Agenda extends React.PureComponent {

  render() {

    if (this.props.users === undefined) {
      return (<LoadingIcon />);
    }
    
    return (  
      <BigCalendar
        events={[{
          id: 0,
          title: 'Deniz Akyurt ile randevum',
          start: new Date(2018, 4, 14, 14, 0, 0),
          end: new Date(2018, 4, 14, 14, 45, 0),
        },{
          id: 1,
          title: 'Deniz Akyurt ile randevum',
          start: new Date(2018, 4, 21, 14, 0, 0),
          end: new Date(2018, 4, 21, 14, 30, 0),
        },{
          id: 2,
          title: 'Deniz Akyurt ile randevum',
          start: new Date(2018, 4, 28, 14, 0, 0),
          end: new Date(2018, 4, 28, 14, 30, 0),
        },{
          id: 3,
          title: 'Deniz Akyurt ile randevum',
          start: new Date(2018, 5, 5, 14, 0, 0),
          end: new Date(2018, 5, 5, 14, 45, 0),
        }]}
        defaultView="week"
        steps={30}
        timeslots={1}
        selectable={true}
        views={['week']}
        min= {new Date(2018, 4, 1, 8, 0, 0)}
        max= {new Date(2018, 4, 1, 19, 0, 0)}
        messages={{
          next: "Sonraki Hafta",
          previous: "Önceki Hafta",
          today: "Bugün"
        }}
      />);
  }
}

export default enhance(Agenda)