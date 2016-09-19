const routes = [
    {path: "/location", getComponent: getLocationComponent},
];

export default routes;

function getLocationComponent(nextState, cb) {
    require.ensure([], (require) => {
        cb(null, require("./pages/LocationSearch").default);
    });
}