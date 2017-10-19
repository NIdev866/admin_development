import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route , Switch, Redirect } from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin'
import reduxThunk from 'redux-thunk';
import CreateCampaignParent from "./adminApp/createCampaignApp/createCampaignParent"
import AdminParent from "./adminApp/adminParent"

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import WebFont from 'webfontloader';

import globalFonts from './style/globalFonts.js'
import globalThemes from './style/globalThemes.js'


injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk, promise)
  ));


const muiTheme = getMuiTheme({
  tabs: {
    backgroundColor: globalThemes.blueGrey500,
  }
});




WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif', 'Abel']
  }
});




ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={AdminParent} />
            <Route path="/create-campaign" component={CreateCampaignParent} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'));