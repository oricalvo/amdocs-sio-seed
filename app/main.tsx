/// <reference path="../typings/all.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "./layout/components/AppContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
const injectTapEventPlugin  = require('react-tap-event-plugin');

//
//  Inject store variable into each component context
//
import {Provider as ReduxProvider} from "react-redux";
import {appStore} from "./store/AppStore";

//
//  General look and theme styling of this application
//  You should rarely touch this file and instead update a component specific css
//
require("./../styles/site.scss");

//
//  This React plugin is required by Material-UI
//  It should be removed once React support the touch event natively
//
injectTapEventPlugin();

ReactDOM.render(
    <ReduxProvider store={appStore}>
        <MuiThemeProvider>
            <AppContainer />
        </MuiThemeProvider>
    </ReduxProvider>,
    document.getElementById("app-container")
);
