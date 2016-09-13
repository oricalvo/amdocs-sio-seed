import * as React from 'react'
import LocationWidget from '../components/LocationWidget/LocationWidget'

interface Props {
}

interface State {
}

// The Widget Root
export default class LocationSearch extends React.Component<Props,State> {
  render () {
    return (
      <div>
        <LocationWidget />
      </div>
    )
  }
}
