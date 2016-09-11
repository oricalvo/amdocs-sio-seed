import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
const classes = require("./Home.scss");

interface HomeProps {
}

interface HomeState {
}

export class Home extends React.Component<HomeProps, HomeState> {
    constructor() {
        super();
    }

    render() {
        return <div className={classes.home}>
            <h1 >Admin</h1>
            <RaisedButton label="Click me" />
        </div>;
    }
}
