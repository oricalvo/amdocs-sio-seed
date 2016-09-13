import { LocationState } from './main'
export const FETCH_LOCATIONS_START = "FETCH_LOCATIONS_START";
export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";

interface FetchLocationStart {
  type: string;
}

interface FetchLocationSuccess {
  type: string;
  locations: Array<any>;
}

interface FetchLocationFailure {
  type: string;
  err: string;
}

export function fetchLocationStartAction() {
  return <FetchLocationStart>{
    type: FETCH_LOCATIONS_START,
  };
}

export function fetchLocationSuccessAction(locations: Array<any>) {
  return <FetchLocationSuccess>{
    type: FETCH_LOCATIONS_SUCCESS,
    locations: locations,
  };
}

export function fetchLocationFailureAction(err: string) {
  return <FetchLocationFailure>{
    type: FETCH_LOCATIONS_FAILURE,
    err: err,
  };
}

export function fetchLocationStartReducer(state: LocationState, action: FetchLocationStart): LocationState {
  let newState = Object.assign({}, state);
  newState.fetching = true;
  return newState;
}

export function fetchLocationSuccessReducer(state: LocationState, action: FetchLocationSuccess): LocationState {
  let newState = Object.assign({}, state);
  newState.fetching = false;
  newState.fetched = true;
  newState.locations = action.locations;
  return newState;
}

export function fetchLocationFailureReducer(state: LocationState, action: FetchLocationFailure): LocationState {
  let newState = Object.assign({}, state);
  newState.fetching = false;
  newState.fetched = false;
  newState.err = action.err;
  return newState;
}