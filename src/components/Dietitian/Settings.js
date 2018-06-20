import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase'
import { Grid, Row, Col } from 'react-flexbox-grid';


import '../../styles/MessageList.css'
import LoadingIcon from '../Common/LoadingIcon';
import ProfileAppBar from '../Common/ProfileAppBar';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/tr';

const enhance = compose(
  withRouter,
  firebaseConnect([
    { path: 'users' },
  ]),
  connect(({ firebase }) => ({
      users: firebase.data.users,
    })
  )
);

class Settings extends React.PureComponent {

  render() {

    if (this.props.users === undefined) {
      return (<LoadingIcon />);
    }
    
    return ( 
      <div> 
        <ProfileAppBar title="Ayarlar"/>
        {/* <Grid fluid style={{minHeight: "100vh"}}>
            <Row center="xs" middle="xs" style={{minHeight: "100vh"}}>
                <Col xs={6} md={4} lg={3}>
                    &lt; Intentionally left blank &gt;
                </Col>
            </Row>
        </Grid> */}
      </div>
  );
  }
}

export default enhance(Settings)