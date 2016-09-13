import * as React from "react";

interface Props {
  lng: number,
  lat: number,
  zoom?: number,
  size?: string,
  maptype?: string
}

interface State {
  url: string,
  token: string
}

export default class StaticMap extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      url: 'https://maps.googleapis.com/maps/api/staticmap',
      token: 'AIzaSyDIn4755zzPUOcbh_betb3XWN75DpV_hNM'
    }
  }
  public static defaultProps: Props = {
    lng: 0,
    lat: 0,
    zoom: 12,
    size: '180x130',
    maptype: 'roadmap'
  }
  
  render() {
    const params = 'zoom=' + this.props.zoom + '&size=' + this.props.size + '&maptype=' + this.props.maptype
    let url = this.state.url + '?center=' + this.props.lat + ',' + this.props.lng + '&' + params + '&key=' +
      this.state.token

    return (
      <img src={url} alt='Map' />
    )
  }
}
