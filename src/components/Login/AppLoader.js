import React, { Component } from 'react';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton';
import LoadingIcon from '../Common/LoadingIcon';
import AdminRoute, { isFirebaseAdmin, getFirebaseDietitianId } from './AdminRoute';

import GoogleButton from 'react-google-button'
import InstagramLogin from 'react-instagram-login';
import {GoogleLoginButton, InstagramLoginButton} from 'react-social-login-buttons';

import { Route, Redirect } from 'react-router-dom';

import App from '../App';
import ProfileMenuItem from './ProfileMenuItem';
import TestLoginButton from './TestLoginButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-119872360-1');

class AppLoader extends Component {
  constructor(props, context) {
    super(props, context);

    this.receiveMessage = this.receiveMessage.bind(this);
    this.login = this.login.bind(this);
    window.addEventListener("message", this.receiveMessage, false);

    if (this.props.location.search.indexOf("?email=") == 0) {
      this.demoEmail = this.props.location.search.substring(7).replace('.', '?');
      this.props.firebase.database().ref().child('portal_demo_logins/opened').update({ [this.demoEmail] : Date.now() });
      GoogleAnalytics.pageview(window.location.hostname + this.props.location.pathname + this.props.location.search);
    }
  }

  login(event) {
    if (this.demoEmail !== undefined) {
      this.props.firebase.database().ref().child('portal_demo_logins/logged_in').update({ [this.demoEmail] : Date.now() });
      GoogleAnalytics.pageview(window.location.hostname + this.props.location.pathname + this.props.location.search + '&loggedIn=true');
    }
    
    this.props.firebase.login({ email: 'diyetkocumtest@diyetkocum.net', password: 'diyetkocumtest' });
  }

  receiveMessage(event) {
    // Do we trust the sender of this message?  (might be
    // different from what we originally opened, for example).
    // if (event.origin !== "https://diyetkocum.net") {
    //   console.log("Incorrect event origin " + event.origin);
    //   return;
    // }

    this.props.firebase.login({
      token: event.data.token
    })
  }

  render() {
    if (!isLoaded(this.props.auth)) {
      return ( <LoadingIcon /> );
    }
    
    if (isEmpty(this.props.auth)) {
      return (
        <Grid fluid style={{minHeight: "100vh"}}>
            <Row center="xs" middle="xs" style={{minHeight: "100vh"}}>
                <Col xs={6} md={6} lg={3}>
                  <TestLoginButton 
                    text="Demo hesabı ile giriş yap" 
                    onClick={(evt) => this.login(evt)}/>
                  <br />
                  <GoogleLoginButton 
                    text="Google ile giriş yap"
                    onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })} /> 
                  <br />
                  <InstagramLoginButton 
                    text="İnstagram ile giriş yap" 
                    onClick={() => {
                      window.open('https://www.diyetkocum.net/redirect', 'firebaseAuth', 'height=315,width=400');
                    }}/>
                </Col>
            </Row>
        </Grid>
      )
    }
    
    if (this.demoEmail !== undefined) {
      this.props.history.push('/');
      window.location.reload();
      return <div />;
    }

    return <App />
  }
}

export default compose(
  withRouter,
  firebaseConnect(),
  connect(({ firebase }) =>({
      auth: firebase.auth,
  })),
)(AppLoader)
