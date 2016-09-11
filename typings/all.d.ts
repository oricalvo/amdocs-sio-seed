/// <reference path="index.d.ts" />

interface NodeRequire {
    ensure(deps: string[], cb: Function);
}

declare module "react-tap-event-plugin" {
    var dummy: any;
    export default dummy;
}

declare interface ObjectConstructor {
    assign(obj: any, obj2: any): any;
}
