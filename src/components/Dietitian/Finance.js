import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebase, firebaseConnect, populate } from 'react-redux-firebase'
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

import '../../styles/MessageList.css'
import LoadingIcon from '../Common/LoadingIcon';
import ProfileAppBar from '../Common/ProfileAppBar';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Moment from 'react-moment';
import 'moment/locale/tr';

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

class Finance extends React.PureComponent {

  render() {

    if (this.props.users === undefined) {
      return (<LoadingIcon />);
    }
    
    return ( 
      <div> 
        <ProfileAppBar title="Finanslarım"/>
        {/* <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle firstChild={true} text="Finanslarım" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            <RaisedButton label="Yeni Kayıt Ekle" primary={true} />
          </ToolbarGroup>
        </Toolbar> */}

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
      </div>
  );
  }
}

export default enhance(Finance)