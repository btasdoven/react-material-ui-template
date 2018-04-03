import React, { Component } from 'react';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import GoogleButton from 'react-google-button'
import InstagramLogin from 'react-instagram-login';
import {GoogleLoginButton, InstagramLoginButton} from 'react-social-login-buttons';

import { Route, Redirect } from 'react-router-dom';

import App from '../App';
import ProfileMenuItem from './ProfileMenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';

//textAlign: "center", margin: "auto", marginTop: "25%", width: "25em"

class AppLoader extends Component {
  constructor(props, context) {
    super(props, context);

    this.receiveMessage = this.receiveMessage.bind(this);
    window.addEventListener("message", this.receiveMessage, false);
  }

  receiveMessage(event) {
    console.log(event);
    // Do we trust the sender of this message?  (might be
    // different from what we originally opened, for example).
    // if (event.origin !== "http://example.com")
    //   return;

    this.props.firebase.login({
      token: event.data.token
    })
  }

  render() {
    return (
      !isLoaded(this.props.auth)
      ? <CircularProgress />
      : isEmpty(this.props.auth)
        ? <Grid fluid style={{minHeight: "100vh"}}>
            <Row center="xs" middle="xs">
                <Col xs={6} md={4} lg={3}>
                  <GoogleLoginButton 
                    text="Google ile giriş yap"
                    onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })} />
                </Col>
              </Row>
              <Row center="xs" middle="xs">
                <Col xs={6} md={4} lg={3}>
                    <InstagramLoginButton 
                      text="İnstagram ile giriş yap" 
                      onClick={() => {
                        window.open('https://www.diyetkocum.net/redirect', 'firebaseAuth', 'height=315,width=400');
                      }}/>
                </Col>
              </Row>
            </Grid>
        : <App /> 
      )
    }
  }

export default compose(
  withRouter,
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(AppLoader)
