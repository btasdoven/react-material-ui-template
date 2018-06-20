import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProviderV0 from 'material-ui/styles/MuiThemeProvider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import purple from '@material-ui/core/colors/purple';

import './styles/index.css';
import AppLoader from './components/Login/AppLoader';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
  
import { Provider } from 'react-redux'
import reducers from './reducers'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { createStore } from 'redux'
import { compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'


  // react-redux-firebase options
  const config = {
    userProfile: 'users', // firebase root where user profiles are stored
    chats: 'chats',
    dietitians: 'dietitians',
    messages: 'messages',
    enableLogging: false, // enable/disable Firebase's database logging
    updateProfileOnLogin: false,
  }
  
  // Add redux Firebase to compose
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, config)
  )(createStore)

const store = createStoreWithFirebase(reducers, responsiveStoreEnhancer)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
      accent1Color: deepOrange500,
    },
  });

const muiThemeNext = createMuiTheme();

// const Content = (props) => (
//     <div>
//         <ResponsiveAppBar
//             title={'Responsive Material-UI Drawer DEMO'}
//             iconElementRight={<FlatButton label="Demo" />}
//         />
//     {props.children}
//     </div>
// )
   
ReactDOM.render((
    <Provider store={store}>
      <MuiThemeProvider theme={muiThemeNext}>
        <MuiThemeProviderV0 muiTheme={muiTheme}>
            <BrowserRouter>
                <AppLoader />
            </BrowserRouter>
        </MuiThemeProviderV0>
      </MuiThemeProvider>
    </Provider>
), document.getElementById('root'))

registerServiceWorker();
