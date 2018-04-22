import React, { Component } from 'react';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import LoadingIcon from '../Common/LoadingIcon';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  !isLoaded(auth)
    ? <Route {...rest} render={(props) => (<LoadingIcon />)} />
    : isEmpty(auth)
      ? <Route {...rest} render={(props) => (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )} />
      : <Route {...rest} render={(props) => (<Component {...props} />)} />
)

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(PrivateRoute)
