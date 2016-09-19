import * as React from 'react'
import LocationLookup from './LocationLookup'
import LocationList from './LocationList'
const classes = require("./LocationWidget.scss");

interface Props {
}

interface State {
}

// The Widget Root
export default class LocationWidget extends React.Component<Props,State> {
  render () {
    return (
      <div className={classes.home}>
        <h1>Google Maps search <small>(Location Widget)</small></h1>
        <LocationLookup />
        <LocationList />
      </div>
    )
  }
}