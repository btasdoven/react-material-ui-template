import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';

import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';

import './index.css';
import App from './App';
import Main from './Main';
import DietitianList from './DietitianList';
import UserList from './UserList';
import SimpleCard from './components/SimpleCard';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {
    ResponsiveDrawer,
    BodyContainer
} from 'material-ui-responsive-drawer'
  
import { Provider } from 'react-redux'
import reducers from './reducers'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { createStore } from 'redux'
const store = createStore(reducers, responsiveStoreEnhancer)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
      accent1Color: deepOrange500,
    },
  });

// const Content = (props) => (
//     <div>
//         <ResponsiveAppBar
//             title={'Responsive Material-UI Drawer DEMO'}
//             iconElementRight={<FlatButton label="Demo" />}
//         />
//     {props.children}
//     </div>
// )

const App2 = () => (
    <div>
        <ResponsiveDrawer>
            <MenuItem 
                containerElement={<Link to='/'/>} 
                primaryText="Home" 
                leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                />
            <MenuItem 
                containerElement={<Link to='/roster'/>}
                primaryText="Roster" 
                leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                />
            <MenuItem 
                containerElement={<Link to='/schedule'/>}
                primaryText="Schedule" 
                leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                />
            <MenuItem 
                containerElement={<Link to='/dietitians'/>}
                primaryText="Diyetisyenler" 
                leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                />
            <MenuItem 
                containerElement={<Link to='/users'/>}
                primaryText="Danisanlar" 
                leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                />
            <MenuItem 
                containerElement={<Link to='/cards'/>}
                primaryText="Simple Card" 
                leftIcon={<FontIcon className="material-icons">people</FontIcon>}
                />
        </ResponsiveDrawer>
        <BodyContainer>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/roster' component={Main}/>
                <Route path='/schedule' component={App}/>
                <Route path='/dietitians' component={DietitianList}/>
                <Route path='/users' component={UserList}/>
                <Route path='/cards' component={SimpleCard}/>
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
