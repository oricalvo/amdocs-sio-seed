const routes = [
    {path: "/about", getComponent: getHomeComponent},
];

export default routes;

function getHomeComponent(nextState, cb) {
    require.ensure([], (require) => {
        cb(null, require("./components/Home").Home);
    });
}
