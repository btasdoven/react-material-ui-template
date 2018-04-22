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
    if (!isLoaded(this.props.auth)) {
      return ( <LoadingIcon /> );
    }
    
    if (isEmpty(this.props.auth)) {
      return (
        <Grid fluid style={{minHeight: "100vh"}}>
            <Row center="xs" middle="xs" style={{minHeight: "100vh"}}>
                <Col xs={6} md={6} lg={3}>
                  <GoogleLoginButton 
                    text="Google ile giriş yap"
                    onClick={() => this.props.firebase.login({ provider: 'google', type: 'popup' })} /> <br />

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

    if (this.props.auth === undefined || this.props.dietitians === undefined) {
      return ( <LoadingIcon /> );
    }

    var isAdmin = isFirebaseAdmin(this.props.auth);

    var uid = this.props.auth.uid === "B7Kpe30S9dclhsrkG3csRKxsT2C3" 
      ? "chatfeedback" // for diyetkocumapp@gmail.com
      : this.props.auth.uid;

    var isAuthorizedUser = this.props.dietitians[uid] !== undefined;

    if (!isAdmin && !isAuthorizedUser) {
      this.props.firebase.logout();
      this.props.history.push('/');
      alert("Bu e-posta adresi sistemimizde diyetisyen olarak kayitli degildir.");
      window.location.reload();
    }
    
    return <App />
  }
}

export default compose(
  withRouter,
  firebaseConnect({ path: 'dietitians' }),
  connect(({ firebase }) =>({
      auth: firebase.auth,
      dietitians: firebase.data.dietitians,
  })),
)(AppLoader)
