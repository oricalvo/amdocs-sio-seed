/*
    The file implements the same behavior as Home but with react-redux connect method
 */

import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {AppState} from "../../store/AppStore";
import {root} from "../../common/LocaleService";
import {actions} from "../reducers/main";
import {Clock} from "../components/Clock";
const classes = require("./Home.scss");
let messages = root.create(require("./Home.messages.json"));
import {connect} from "react-redux";

interface Props {
    titleColor: string;
    clockColor: string;
    locale: string;
    changeTitleAndClockColor: (color: string) => void;
    changeLocale: (color: string) => void;
}

interface State {
}

abstract class _HomeWithConnect extends React.Component<Props, any> {
    private toggleColor() {
        let newColor = (this.props.titleColor === "red" ? "blue" : "red");
        this.props.changeTitleAndClockColor(newColor);
    }

    private toggleLocale() {
        let newLocale = (this.props.locale === "en" ? "he" : "en");
        this.props.changeLocale(newLocale);
    }

    render() {
        let style = {
            color: this.props.titleColor
        };

        return (<div className={classes.home}>
            <h1 style={style} className={classes.title}>{messages.translate("title")}</h1>

            <Clock color={this.props.clockColor}/>

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

const mapStateToProps = (state: AppState) => {
    return {
        titleColor: state.preferences.titleColor,
        clockColor: state.preferences.clockColor,
        locale: state.preferences.locale,
    }
};

const mapDispatchToProps = {
    changeTitleAndClockColor: actions.changeTitleAndClockColor,
    changeLocale: actions.changeLocale,
};

export const HomeWithConnect = (connect as any)(mapStateToProps, mapDispatchToProps)(_HomeWithConnect);
