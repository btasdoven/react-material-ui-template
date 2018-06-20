import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import LoadingIcon from '../Common/LoadingIcon'
import ProfileAppBar from '../Common/ProfileAppBar'
import {Card, CardActions, CardHeader, CardContent } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

class Dashboard extends Component {

  render() {
    if (this.props.auth === undefined) {
      return (<LoadingIcon />)
    }

    return (
      <div>
        <ProfileAppBar title="Ana Sayfa"/>
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
              <Card>
                <CardHeader
                  title="Danışanlarına bildirim gönder"
                  avatar={<FontIcon className="material-icons">notification_important</FontIcon>}
                />
                <CardActions>
                    <FlatButton label="Yeni Danışan Profili Oluştur"/>
                </CardActions>
              </Card>
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