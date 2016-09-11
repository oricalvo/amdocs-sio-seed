import {createStore, combineReducers, Reducer, Store} from "redux";
import {PreferencesState, preferencesReducer} from "../preferences/reducers/main";
import {AdminState, adminReducer} from "../admin/reducers/main";

export interface AppState {
    preferences: PreferencesState;
    admin: AdminState;
}

const appReducer: Reducer<AppState> = combineReducers<AppState>({
    preferences: preferencesReducer,
    admin: adminReducer,
});

export let appStore: Store<AppState> = createStore<AppState>(appReducer);
