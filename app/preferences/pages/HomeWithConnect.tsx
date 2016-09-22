/*
    The file implements the same behavior as Home but with react-reduc connect method
 */

import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {AppState} from "../../store/AppStore";
import {root} from "../../common/LocaleService";
import {actions} from "../reducers/main";
import Store = ReactRedux.Store;
import {Clock} from "../components/Clock";
const classes = require("./Home.scss");
let messages = root.create(require("./Home.messages.json"));
import {connect} from "react-redux";

interface Home2Props {
}

interface Home2State {
    color: string;
}

export class Home2 extends React.Component<Home2Props, Home2State> {
    store: Store<AppState>;
    titleColor: string;
    clockColor: string;
    locale: string;

    private sayHello() {
        //alert("Hello");
    }

    private toggleColor() {
        let newColor = (this.titleColor === "red" ? "blue" : "red");
        this.store.dispatch(actions.changeTitleAndClockColor(newColor));
    }

    private toggleLocale() {
        let newLocale = (this.locale === "en" ? "he" : "en");
        (this as any).dispatch(actions.changeLocale(newLocale));
    }

    render() {
        let style = {
            color: this.titleColor
        };

        return (<div className={classes.about}>
            <h1 style={style} className={classes.title}>{messages.translate("title")}</h1>

            <Clock color={this.clockColor}/>

            <RaisedButton
                className={classes.button}
                onClick={() => this.sayHello()}>{messages.translate("say_hello")}
            </RaisedButton>

            <RaisedButton
                className={classes.button}
                onClick={() => this.toggleColor()}>{messages.translate("toggle_color")}
            </RaisedButton>

            <RaisedButton
                className={classes.button}
                onClick={() => this.toggleLocale()}>{messages.translate("toggle_locale")}
            </RaisedButton>
        </div>);
    }
}

export default connect(
    (state: AppState) => ({
        titleColor: state.preferences.titleColor,
        clockColor: state.preferences.clockColor,
        locale: state.preferences.locale,
    }),
    actions as any) as any as Home2;
