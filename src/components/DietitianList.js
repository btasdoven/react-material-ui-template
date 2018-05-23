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
import SmartTable from './Common/SmartTable/SmartTable';

const enhance = compose(
  firebaseConnect([{ path: 'dietitians' }]),
  connect(({ firebase }) => ({
    dietitians: firebase.data.dietitians 
  }))
);

class DietitianList extends Component {

  headers = [
    { alias: 'ID', sortable: true, dataAlias: 'id' },
    { alias: 'App Version', sortable: true, dataAlias: 'appVersion' },
    { alias: 'Name', sortable: true, dataAlias: 'name' },
    { alias: 'Age', sortable: true, dataAlias: 'age' },
    { alias: 'Gender', sortable: true, dataAlias: 'gender' },
    { alias: 'Height (cm)', sortable: true, dataAlias: 'height' },
    { alias: 'Weight (kg)', sortable: true, dataAlias: 'weight' },
    { alias: 'Target Weight', sortable: true, dataAlias: 'targetWeight' },
    { alias: 'Target Days', sortable: true, dataAlias: 'targetDays' },
    { alias: 'Daily Kcal', sortable: true, dataAlias: 'dailyKcal' },
  ];

  render() {

    var ctx = this.props.dietitians || {};
    ctx = Object.keys(ctx).map(k => {
      return {
        id: k,
        appVersion: ctx[k].appVersion || "",
        name: ctx[k].name || "",
        gender: (ctx[k].information || {}).gender || "",
        age: (ctx[k].information || {}).age || "",
        height: (ctx[k].information || {}).height || "",
        weight: (ctx[k].information || {}).weight || "",
        targetWeight: (ctx[k].information || {}).targetWeight || "",
        targetDays: (ctx[k].information || {}).targetDays || "",
        dailyKcal: (ctx[k].information || {}).dailyKcal || "",
      }
    });

    return (
      <Paper>
        <SmartTable 
          isLoading={ !ctx || ctx.length === 0 }
          data={ ctx }
          headers={ this.headers }
          limit={ 40 }
          total={ ctx.length } />
      </Paper>
    );
  }
}

export default enhance(DietitianList);