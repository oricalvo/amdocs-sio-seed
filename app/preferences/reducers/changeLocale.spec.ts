import {changeLocaleReducer} from "./changeLocale";
import {PreferencesState, actions} from "./main";

describe("changeLocaleReducer", () => {
    let state: PreferencesState = {
        titleColor: "",
        clockColor: "",
        locale: "en",
    };

    it("Should change the locale", () => {
        let action = actions.changeLocale("he");
        let newState = changeLocaleReducer(state, action);

        expect(newState.locale).to.equal("he");
    });
});
