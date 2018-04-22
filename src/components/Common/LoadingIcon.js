import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';

class LoadingIcon extends Component {
    render() {
        return (
            <Grid fluid style={{minHeight: "100vh"}}>
                <Row center="xs" middle="xs" style={{minHeight: "100vh"}}>
                    <Col xs={6} md={4} lg={3}>
                        <CircularProgress />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default LoadingIcon;
