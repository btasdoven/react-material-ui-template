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

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardNext from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CardContentNext from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PersonAdd from '@material-ui/icons/PersonAdd';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Icon from '@material-ui/core/Icon';
import { WeightKilogramIcon } from 'mdi-react';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '100%',
  },
  content: {
    textAlign: 'center',
    width: '100%',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    marginRight: theme.spacing.unit,
  },
  infoIcon: {
    fontSize: 44, marginRight: 10, paddingTop: 4
  },
});

class Dashboard extends Component {

  render() {
    if (this.props.auth === undefined) {
      return (<LoadingIcon />)
    }

    const { classes, theme } = this.props;

    var WrapperForCardAction = (val, label, MyIcon, actionLabel) =>
    {
      return (
        <CardNext className={classes.card}>
          <div className={classes.details}>
            <CardContentNext className={classes.content}>
              <Typography variant="display3">{val}</Typography>
              <Typography variant="subheading" color="textSecondary">{label}</Typography>
            </CardContentNext>
            <Divider/>
            <div className={classes.controls}>
              <Button color="secondary" style={{flex:1, borderRadius: 0}}>
                {MyIcon}
                {actionLabel}
              </Button>
            </div>
          </div>
        </CardNext>
      )
    }

    var WrapperForCardInfo = (val, label, myIcon) =>
    {
      return (
        <CardNext className={classes.card}>
          <div className={classes.details}>
            <CardContentNext className={classes.content}>
              <Typography variant="display3">{myIcon}{val}</Typography>
              <Typography variant="subheading" color="textSecondary">{label}</Typography>
            </CardContentNext>
          </div>
        </CardNext>
      )
    }

    var clientCount = WrapperForCardAction(32, 'Kayıtlı Danışanım', <PersonAdd className={classes.playIcon} />, 'Yeni Danışan Ekle');
    var dietListCount = WrapperForCardAction(11, 'Hazır Diyet Listem', <NoteAdd className={classes.playIcon} />, 'Yeni Liste Oluştur');
    
    var meetingCount = WrapperForCardInfo(11, 'Bu Hafta Görüştüğüm Danışanlarım', <Icon className={classes.infoIcon}>event</Icon>);
    var meetingCount = WrapperForCardInfo(41, 'Bu Haftada Danışanlarımın Kaybettiği Kilo', <WeightKilogramIcon className={classes.playIcon} />);

    return (
      <div>
        <ProfileAppBar title="Ana Sayfa"/>
        <Grid fluid>
          <Row style={{marginTop: 12}}>
            <Col xs={12} md={3} lg={3}>
              {clientCount}
            </Col>
            <Col xs={12} md={3} lg={3}>
              {dietListCount}
            </Col>
            <Col xs={12} md={3} lg={3}>
              {clientCount}
            </Col>
            <Col xs={12} md={3} lg={3}>
              {clientCount}
            </Col>
          </Row>
          <Row style={{marginTop: 12}}>
            <Col xs={12} md={3} lg={3}>
              {meetingCount}
            </Col>
            <Col xs={12} md={3} lg={3}>
              {meetingCount}
            </Col>
            <Col xs={12} md={3} lg={3}>
              {meetingCount}
            </Col>
            <Col xs={12} md={3} lg={3}>
              {meetingCount}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth })),
  withStyles(styles, { withTheme: true })
)(Dashboard)