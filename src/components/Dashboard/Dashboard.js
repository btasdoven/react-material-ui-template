import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import LoadingIcon from '../Common/LoadingIcon'
import ProfileAppBar from '../Common/ProfileAppBar'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import Avatar from 'material-ui/Avatar';

class Dashboard extends Component {

  render() {
    if (this.props.auth === undefined) {
      return (<LoadingIcon />)
    }

    return (
      <div>
        <ProfileAppBar />
        <Grid fluid style={{marginTop: 12}}>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <Card>
                <CardHeader
                  title="Danışanlarına bildirim gönder"
                  avatar={<FontIcon className="material-icons">notification_important</FontIcon>}
                />
                <CardActions>
                    <TextField
                      hintText="Mesajını yaz"/>
                    <FlatButton label="Gönder"/>
                </CardActions>
              </Card>
            </Col>
            <Col xs={12} md={4} lg={4}>
            </Col>
            <Col xs={12} md={4} lg={4}>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Dashboard)