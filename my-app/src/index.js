import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import App from './App';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {
    ResponsiveDrawer,
    BodyContainer,
    ResponsiveAppBar
} from 'material-ui-responsive-drawer'
  
import { Provider } from 'react-redux'
import reducers from './reducers'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { createStore, compose } from 'redux'
const store = createStore(reducers, responsiveStoreEnhancer)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
      accent1Color: deepOrange500,
    },
  });

const App2 = () => (
    <div>
        <ResponsiveDrawer>
            <MenuItem><Link to='/'>Home</Link></MenuItem>
            <MenuItem><Link to='/roster'>Roster</Link></MenuItem>
            <MenuItem><Link to='/schedule'>Schedule</Link></MenuItem>
        </ResponsiveDrawer>
        <BodyContainer>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/roster' component={Main}/>
                <Route path='/schedule' component={App}/>
            </Switch>
        </BodyContainer>
    </div>
)
   
ReactDOM.render((
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <HashRouter>
                <App2 />
            </HashRouter>
        </MuiThemeProvider>
    </Provider>
), document.getElementById('root'))

registerServiceWorker();
