/// <reference path="./typings/all.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "./app/layout/components/AppContainer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const injectTapEventPlugin  = require('react-tap-event-plugin');
import {createStore, combineReducers, Reducer, Store} from 'redux'
require("./styles/site.scss");

//
//  This React plugin is required by Material-UI
//  It should be removed once React support the touch event natively
//
injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <AppContainer />
    </MuiThemeProvider>,
    document.getElementById("app-container")
);
