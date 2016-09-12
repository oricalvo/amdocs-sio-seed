import * as React from "react";

interface ClockProps {
    color: string;
}

interface ClockState {
    time: Date;
}

export class Clock extends React.Component<ClockProps, ClockState> {
    private intervalId: any;

    constructor() {
        super();

        this.state = {
            time: new Date()
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({time: new Date()});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    render() {
        return <div style={{color: this.props.color, marginBottom: "1em"}}>{this.state.time.toTimeString()}</div>;
    }
}
