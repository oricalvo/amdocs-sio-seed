import {CHANGE_TITLE_COLOR, changeTitleAndClockColorReducer, changeTitleAndClockColorAction} from "./changeTitleColor";
import {changeLocaleAction, CHANGE_LOCALE, changeLocaleReducer} from "./changeLocale";
import {Action} from "redux";

export interface PreferencesState {
    locale: string;
    titleColor: string;
    clockColor: string;
}

let initialState: PreferencesState = {
    locale: "en",
    titleColor: "red",
    clockColor: "green",
};

const reducers = {
    [CHANGE_LOCALE]: changeLocaleReducer,
    [CHANGE_TITLE_COLOR]: changeTitleAndClockColorReducer,
};

export const actions = {
    changeLocale: changeLocaleAction,
    changeTitleAndClockColor: changeTitleAndClockColorAction,
};

export function preferencesReducer(state: PreferencesState = initialState, action: Action): PreferencesState {
    let reducer = reducers[action.type];
    if (reducer) {
        return reducer(state, action);
    }

    return state;
}
