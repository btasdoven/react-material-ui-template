import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleDrawerOpen } from 'material-ui-responsive-drawer/es/store/actions'
import isResponsiveAndOverBreakPoint from 'material-ui-responsive-drawer/es/store/selectors'
import AppBar from 'material-ui/AppBar'
import AppBarNext from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

class ResponsiveAppBar extends Component {
  render () {
    const {
      browser,
      responsiveDrawer,
      breakPoint,
      children,
      width,
      openSecondary,
      style,
      showMenuIconButton,
      onLeftIconButtonClick,
      toggleDrawerOpen,
      ...rest
    } = this.props
    const props = { ...(this.props) }
    const setWidth = isResponsiveAndOverBreakPoint(browser, responsiveDrawer, breakPoint)
    const drawerWidth = width !== undefined ? width : 256
    const drawerOnRight = openSecondary !== undefined ? openSecondary : false

    const styles = {
      docked_left: {
        position: 'fixed',
        width: 'auto',
        left: setWidth ? drawerWidth : 0,
        top: 0,
        right: 0,
        ...style
      },
      docked_right: {
        position: 'fixed',
        width: 'auto',
        right: setWidth ? drawerWidth : 0,
        top: 0,
        left: 0,
        ...style
      }
    }

    const appBarProps = {
      width,
      style: drawerOnRight ? styles.docked_right : styles.docked_left,
      onClick: onLeftIconButtonClick !== undefined ? onLeftIconButtonClick : toggleDrawerOpen,
      ...rest
    }

    var toggleMenuButton = undefined;
    if (showMenuIconButton === true || !setWidth) {
      toggleMenuButton = (
        <IconButton style={{
            marginLeft: -12,
            marginRight: 20,
          }} color="inherit" aria-label="Menu">
          <MenuIcon/>
        </IconButton>)
    }

    return (
      <div>
      <AppBarNext {...appBarProps}>
        <Toolbar>
          {toggleMenuButton}
          {children}
        </Toolbar>
      </AppBarNext>
      </div>
    )
  }
}

ResponsiveAppBar.propTypes = {
  responsiveDrawer: PropTypes.object.isRequired,
  browser: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  style: PropTypes.object,
  breakPoint: PropTypes.string,
  width: PropTypes.number,
  openSecondary: PropTypes.bool,
  showMenuIconButton: PropTypes.bool,
  onLeftIconButtonClick: PropTypes.func
}

const mapStateToProps = (state) => {
  const { browser, responsiveDrawer } = state
  return {
    browser,
    responsiveDrawer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawerOpen: () => {
      dispatch(toggleDrawerOpen())
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveAppBar)