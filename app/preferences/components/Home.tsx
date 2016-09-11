import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {appStore} from "../../store/AppStore";
import {Unsubscribe} from "redux";
import {root} from "../../common/LocaleService";
import {actions} from "../reducers/main";
const classes = require("./Home.scss");
let messages = root.create(require("./Home.messages.json"));

interface HomeProps {
}

interface HomeState {
    color: string;
}

export class Home extends React.Component<HomeProps, HomeState> {
    unsubscribe: Unsubscribe;

    constructor() {
        super();

        this.state = {
            color: appStore.getState().preferences.titleColor,
        };

        this.unsubscribe = appStore.subscribe(() => {
            this.setState({
                color: appStore.getState().preferences.titleColor,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    sayHello() {
        alert("Hello");
    }

    toggleColor() {
        let newColor = (this.state.color === "red" ? "blue" : "red");
        appStore.dispatch(actions.changeTitleColor(newColor));
    }

    toggleLocale() {
        let newLocale = (appStore.getState().preferences.locale === "en" ? "he" : "en");
        appStore.dispatch(actions.changeLocale(newLocale));
    }

    render() {
        let style = {
            color: this.state.color
        };

        return (<div className={classes.about}>
            <h1 style={style} className={classes.title}>{messages.translate("title")}</h1>

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
