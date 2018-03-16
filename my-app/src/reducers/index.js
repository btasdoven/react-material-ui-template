import { responsiveStateReducer } from 'redux-responsive'
import { combineReducers } from 'redux'
import { responsiveDrawer } from 'material-ui-responsive-drawer'
import { firebaseReducer } from 'react-redux-firebase'

const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer: responsiveDrawer,
  firebase: firebaseReducer
})

export default reducers