import React, { Component } from 'react';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import LoadingIcon from '../Common/LoadingIcon';

import { Route, Redirect } from 'react-router-dom';
    
import withTracker from './PageTracker'

const TrackedRoute = withTracker(Route)
const TrackedUnauthRoute = withTracker(Route, {unauth: 'PrivateRoute'})

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (!isLoaded(auth)) {
    return (<Route {...rest} render={(props) => (<LoadingIcon />)} />)
  } else if (isEmpty(auth)) {
    return 
      <TrackedUnauthRoute {...rest} render={(props) => (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )} />
  } else {
    return <TrackedRoute {...rest} render={(props) => (<Component {...props} />)} />
  }
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(PrivateRoute)
