import {Action} from "redux";
import * as r from './FetchLocation'

export interface LocationState {
  fetching: boolean,
  fetched: boolean,
  filter?: string,
  locations: Array<any>,
  err: string
}

export const initialState: LocationState = {
  fetching: false,
  fetched: false,
  filter: null,
  locations: [],
  err: null
};

const reducers = {
  [r.FETCH_LOCATIONS_START]: r.fetchLocationStartReducer,
  [r.FETCH_LOCATIONS_SUCCESS]: r.fetchLocationSuccessReducer,
  [r.FETCH_LOCATIONS_FAILURE]: r.fetchLocationFailureReducer,
};

export const actions = {
  fetchLocationStart: r.fetchLocationStartAction,
  fetchLocationSuccess: r.fetchLocationSuccessAction,
  fetchLocationFailure: r.fetchLocationFailureAction
};

export function locationReducer(state: LocationState = initialState, action: Action): LocationState {
  let reducer = reducers[action.type];
  if (reducer) {
      return reducer(state, action);
  }

  return state;
}
