import {PreferencesState} from "./main";
export const CHANGE_TITLE_COLOR = "CHANGE_TITLE_COLOR";

interface ChangeTitleColor {
    type: string;
    color: string;
}

export function changeTitleColorAction(color: string) {
    return <ChangeTitleColor>{
        type: CHANGE_TITLE_COLOR,
        color: color,
    };
}

export function changeTitleColorReducer(state: PreferencesState, action: ChangeTitleColor): PreferencesState {
    let newState = Object.assign({}, state);

    newState.titleColor = action.color;

    return newState;
}
