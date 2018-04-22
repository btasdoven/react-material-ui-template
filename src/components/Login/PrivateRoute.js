import React, { Component } from 'react';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
<<<<<<< HEAD
import LoadingIcon from '../Common/LoadingIcon';
=======
import CircularProgress from 'material-ui/CircularProgress';
>>>>>>> 6ae7105afc06ecb3e14c996bc1e7575253ffc2bd

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  !isLoaded(auth)
<<<<<<< HEAD
    ? <Route {...rest} render={(props) => (<LoadingIcon />)} />
=======
    ? <Route {...rest} render={(props) => (<CircularProgress />)} />
>>>>>>> 6ae7105afc06ecb3e14c996bc1e7575253ffc2bd
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
