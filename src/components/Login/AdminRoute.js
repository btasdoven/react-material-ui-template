import React, { Component } from 'react';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import LoadingIcon from '../Common/LoadingIcon';

import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  !isLoaded(auth)
    ? <Route {...rest} render={(props) => (<LoadingIcon />)} />
    : isEmpty(auth)
      ? <Route {...rest} render={(props) => (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )} />
      : !isFirebaseAdmin(auth)
        ? <Route {...rest} render={(props) => (
            <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} />
          )} />
        :<Route {...rest} render={(props) => (<Component {...props} />)} />
)

export const isFirebaseAdmin = function(auth) {
  return auth != null &&
    (auth.uid === "B7Kpe30S9dclhsrkG3csRKxsT2C3"  // for diyetkocumapp@gmail.com
    || auth.uid === "instagram:6497798074") // for diyetkocumapp@gmail.com
}

export const getFirebaseDietitianId = function(auth) {
  return 
    auth.uid === "B7Kpe30S9dclhsrkG3csRKxsT2C3" 
      ? "chatfeedback" // for diyetkocumapp@gmail.com
      : auth.uid;
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(AdminRoute)
