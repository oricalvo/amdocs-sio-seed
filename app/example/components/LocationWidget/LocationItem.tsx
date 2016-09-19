import * as React from 'react'
import StaticMap from './StaticMap'
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';

interface Props {
  lng: number,
  lat: number,
  formatted_address: string
}

interface State {
}

export default class LocationItem extends React.Component<Props, State> {
  render () {
    return (
      <GridTile cols={1} rows={1} title={this.props.formatted_address} subtitle={'lng: '+this.props.lng+' lat: '+ this.props.lat} >
        <StaticMap lat={this.props.lat} lng={this.props.lng} />
      </GridTile>
    )
  }
}
