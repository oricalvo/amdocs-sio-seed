import {createStore, combineReducers, Reducer, Store} from "redux";
import {PreferencesState, preferencesReducer} from "../preferences/reducers/main";
import {AdminState, adminReducer} from "../admin/reducers/main";
import {LocationState, locationReducer} from '../example/reducers/main'

export interface AppState {
    preferences: PreferencesState;
    admin: AdminState;
    location: LocationState;
}

const appReducer: Reducer<AppState> = combineReducers<AppState>({
    preferences: preferencesReducer,
    admin: adminReducer,
    location: locationReducer,
});

export let appStore: Store<AppState> = createStore<AppState>(appReducer,window['devToolsExtension'] && window['devToolsExtension']());
