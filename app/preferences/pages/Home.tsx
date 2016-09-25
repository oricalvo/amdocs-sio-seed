import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {AppState} from "../../store/AppStore";
import {Unsubscribe} from "redux";
import {root} from "../../common/LocaleService";
import {actions} from "../reducers/main";
import Store = ReactRedux.Store;
import {Clock} from "../components/Clock";
const classes = require("./Home.scss");
let messages = root.create(require("./Home.messages.json"));

interface HomeProps {
}

interface HomeState {
    color: string;
}

export class Home extends React.Component<HomeProps, HomeState> {
    static contextTypes = {
        store: React.PropTypes.object
    };

    unsubscribe: Unsubscribe;

    constructor() {
        super();
    }

    componentDidMount() {
        //
        //  store (from context) is available only after component has been mounted
        //
        this.unsubscribe = this.store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.unsubscribe = null;
    }

    private get store(): Store<AppState> {
        return this.context["store"];
    }

    private get titleColor(): string {
        return this.store.getState().preferences.titleColor;
    }

    private sayHello() {
        alert("Hello");
    }

    private toggleColor() {
        let newColor = (this.titleColor === "red" ? "blue" : "red");
        this.store.dispatch(actions.changeTitleAndClockColor(newColor));
    }

    private toggleLocale() {
        let newLocale = (this.store.getState().preferences.locale === "en" ? "he" : "en");
        this.store.dispatch(actions.changeLocale(newLocale));
    }

    render() {
        let style = {
            color: this.titleColor
        };

        const clockColor = this.store.getState().preferences.clockColor;

        return (<div className={classes.home}>
            <h1 style={style} className={classes.title}>{messages.translate("title")}</h1>

            <Clock color={clockColor}/>

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
