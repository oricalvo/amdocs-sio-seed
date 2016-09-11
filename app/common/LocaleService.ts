import {appStore} from "../store/AppStore";
const site = require("../../messages/site.messages.json");

export class MessagesService {
    constructor(private parent: MessagesService, private messages) {
    }

    create(messages): MessagesService {
        return new MessagesService(this, messages);
    }

    private tryTranslate(id) {
        let currentLocale = appStore.getState().preferences.locale;

        if (!this.messages.hasOwnProperty(currentLocale)) {
            return undefined;
        }

        let localeMessages = this.messages[currentLocale];
        if (!localeMessages.hasOwnProperty(id)) {
            return undefined;
        }

        let res = localeMessages[id];
        return res;
    }

    translate(id) {
        let res = undefined;
        let cur: MessagesService = this;
        while (cur != null) {
            res = cur.tryTranslate(id);
            if (res !== undefined) {
                break;
            }

            cur = cur.parent;
        }

        if (res === undefined) {
            throw new Error("Failed to translate: " + id);
        }

        return res;
    }
}

export var root = new MessagesService(null, site);
