import React, { Component } from 'react';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import LoadingIcon from '../Common/LoadingIcon';

import { Route, Redirect } from 'react-router-dom';

import withTracker from './PageTracker'

const TrackedRoute = withTracker(Route)
const TrackedUnauthRoute = withTracker(Route, {unauth: 'AdminRoute'})
const TrackedNonAdminRoute = withTracker(Route, {nonadmin: 'AdminRoute'})

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  !isLoaded(auth)
    ? <Route {...rest} render={(props) => (<LoadingIcon />)} />
    : isEmpty(auth)
      ? <TrackedUnauthRoute {...rest} render={(props) => (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )} />
      : !isFirebaseAdmin(auth)
        ? <TrackedNonAdminRoute {...rest} render={(props) => (
            <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} />
          )} />
        : <TrackedRoute {...rest} render={(props) => (<Component {...props} />)} />
)

export const isFirebaseAdmin = function(auth) {
  return auth != null &&
    (auth.uid === "B7Kpe30S9dclhsrkG3csRKxsT2C3"  // for diyetkocumapp@gmail.com
    || auth.uid === "instagram:6497798074") // for diyetkocum.official
}

export const getFirebaseDietitianId = function(uid) {
  // Special userId <--> dietitianId handling
  //
  if (uid === "B7Kpe30S9dclhsrkG3csRKxsT2C3") {
    return "chatfeedback";
  } else if (uid === "QocEWpgy2Na1eKRHeOR6TLxDtU23") {
    return "diyetkocumtest";
  }
  
  return uid;
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(AdminRoute)
