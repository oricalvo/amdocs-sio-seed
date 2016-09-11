import {CHANGE_TITLE_COLOR, changeTitleColorReducer, changeTitleColorAction} from "./changeTitleColor";
import {changeLocaleAction, CHANGE_LOCALE, changeLocaleReducer} from "./changeLocale";
import {Action} from "redux";

export interface PreferencesState {
    locale: string;
    titleColor: string;
}

let initialState: PreferencesState = {
    locale: "en",
    titleColor: "red",
};

const reducers = {
    [CHANGE_LOCALE]: changeLocaleReducer,
    [CHANGE_TITLE_COLOR]: changeTitleColorReducer,
};

export const actions = {
    changeLocale: changeLocaleAction,
    changeTitleColor: changeTitleColorAction,
};

export function preferencesReducer(state: PreferencesState = initialState, action: Action): PreferencesState {
    let reducer = reducers[action.type];
    if (reducer) {
        return reducer(state, action);
    }

    return state;
}
