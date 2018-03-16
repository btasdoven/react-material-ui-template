/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import Table, { TableBody, TableRowColumn, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import SortIcon from 'material-ui/svg-icons/action/swap-vert';
import styles from '../styles/UserList.scss';

const enhance = compose(
  firebaseConnect([{ path: 'users' }]),
  connect(({ firebase }) => ({
    users: firebase.data.users 
  }))
);

function sortFunc(a, b, key) {
  if (typeof(a[key]) === 'number') {
    return a[key] - b[key];
  }

  const ax = [];
  const bx = [];

  a[key] = a[key] || "";
  b[key] = b[key] || "";
  a[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { ax.push([$1 || Infinity, $2 || '']); });
  b[key].replace(/(\d+)|(\D+)/g, (_, $1, $2) => { bx.push([$1 || Infinity, $2 || '']); });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

class UserLis22t extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortHeader: "",
      isAsc: true,
    }
  }

  sortByColumn(column) {
    var data = this.props.users || [];
    const sortedData = Object.keys(data).sort((a, b) => sortFunc(data[a], data[b], "appVersion")).map(k => [k, data[k]]);

    if (this.state.sortHeader !== column) {
      this.setState({
        sortHeader: column,
      });
    }

    return sortedData;
  }

  render() {
    var ctx = this.sortByColumn(this.state.sortHeader);

    return (
      <Paper>
      <Table selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Gender</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Age</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Height (cm)</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Weight (kg)</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Target Days</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Target Weight</TableHeaderColumn>
            <TableHeaderColumn numeric="true">Daily Kcal</TableHeaderColumn>
            <TableHeaderColumn numeric="true">
              <div> App Version <SortIcon onMouseUp={(e) => this.sortByColumn('appVersion')} /></div>
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          { 
            ctx.map(([key, n]) => {
                n.information = n.information || { };
                return (
                  <TableRow key={key}>
                    <TableRowColumn>{key}</TableRowColumn>
                    <TableRowColumn>{n.name}</TableRowColumn>
                    <TableRowColumn numeric="true">{ n.information.gender || ""}</TableRowColumn>
                    <TableRowColumn numeric="true">{ n.information.age || ""}</TableRowColumn>
                    <TableRowColumn numeric="true">{ n.information.height || ""}</TableRowColumn>
                    <TableRowColumn numeric="true">{ n.information.weight || ""}</TableRowColumn>
                    <TableRowColumn numeric="true">{ n.information.targetDays || ""}</TableRowColumn>
                    <TableRowColumn numeric="true">{ n.information.targetWeight || ""}</TableRowColumn>
                    <TableRowColumn numeric="true">{ n.information.dailyKcal || ""}</TableRowColumn>
                    <TableRowColumn numeric="true">{ n.appVersion || ""}</TableRowColumn>
                  </TableRow>
                );
              })
          }
        </TableBody>
      </Table>
      </Paper>
    );
  }
}

export default enhance(UserLis22t);