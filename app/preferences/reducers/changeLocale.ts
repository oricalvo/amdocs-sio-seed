import {PreferencesState} from "./main";
export const CHANGE_LOCALE = "CHANGE_LOCALE";

interface ChangeLocale {
    type: string;
    locale: string;
}

export function changeLocaleAction(locale: string) {
    return <ChangeLocale>{
        type: CHANGE_LOCALE,
        locale: locale,
    };
}

export function changeLocaleReducer(state: PreferencesState, action: ChangeLocale): PreferencesState {
    let newState = Object.assign({}, state);

    newState.locale = action.locale;

    return newState;
}
