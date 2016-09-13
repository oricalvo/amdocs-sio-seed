import * as React from 'react'
import { connect } from 'react-redux'
import LocationItem from './LocationItem'
import { AppState } from '../../../store/AppStore'
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import {
  blue300, indigo900, orange200, deepOrange300, pink400, purple500, black,
} from 'material-ui/styles/colors';

const styles = {
  root: {
    display: 'flex',
  },
  gridList: {
    overflowY: 'auto',
    marginBottom: 24,
  },
};

interface Props {
  locations: Array<any>
}

interface State {
}

class LocationList extends React.Component<Props,State> {
  constructor(props, context) {
    super(props, context)
    debugger
  }
  public static defaultProps: Props = {
    locations: []
  }
  render () {
    const locationListContent = this.props.locations.map((location, index) => (
      <LocationItem
        key={index}
        formatted_address={location.formatted_address}
        lat={location.geometry.location.lat}
        lng={location.geometry.location.lng}
      />
    ))

    return (
      <div>
        <h3> 
          <Avatar color={black} size={30} >
            {this.props.locations.length}
          </Avatar> Locations
        </h3>
        
        <GridList cols={2} padding={1} cellHeight={200}>
          {locationListContent}
        </GridList>
      </div>
    )
  }
}

// -----> CONNECT <-----
const mapStateToProps = (state: AppState) => ({
  locations: state.location.locations
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationList)
