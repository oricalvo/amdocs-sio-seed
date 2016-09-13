import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../../store/AppStore'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import axios from 'axios'
import { fetchLocationStartAction, fetchLocationSuccessAction, fetchLocationFailureAction } from '../../reducers/FetchLocation'

const googleToken: string = 'AIzaSyDIn4755zzPUOcbh_betb3XWN75DpV_hNM'

const callAPI = (filter, dispatch) => {
  dispatch(fetchLocationStartAction())
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params: { address: filter, key: googleToken } })
    .then((response) => {
      dispatch(fetchLocationSuccessAction(response.data.results))
    })
    .catch((err) => {
      dispatch(fetchLocationFailureAction(err))
    })
}

interface IProps {
  fetching: boolean
  searchAction: (string) => void
}

interface IState {
  searchFilter: string
}

class LocationLookup extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    fetching: false,
    searchAction: (searchFilter) => (alert('LocationLookup search - no action attached...'))
  }
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.searchActionInvoker = this.searchActionInvoker.bind(this)
    this.state = { searchFilter: localStorage.getItem('searchFilter') }
  }
  handleChange(event) {
    localStorage.setItem('searchFilter', event.target.value)
    this.setState({ searchFilter: event.target.value })
  }
  searchActionInvoker() {
    if (this.state.searchFilter === undefined || this.state.searchFilter.trim().length === 0) {
      alert('Please enter search criteria.')
    } else {
      if (!this.props.fetching) {
        this.props.searchAction(this.state.searchFilter)
      }
    }
  }
  render() {
    return (
      <div>
        <TextField id='address-filter'  hintText='Search for...' floatingLabelText='Search for address:'
          value={this.state.searchFilter} onChange={this.handleChange} />
        <RaisedButton primary={true} label={this.props.fetching ? 'Serching...' : 'Search'} onClick={this.searchActionInvoker} >
        </RaisedButton>
      </div>
    )
  }
}

// =======> CONNECT <=======
const mapStateToProps = (state: AppState) => ({
  fetching: state.location.fetching
})

const mapDispatchToProps = (dispatch) => {
  return {
    searchAction: (searchFilter): void => {
      callAPI(searchFilter, dispatch);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationLookup)
