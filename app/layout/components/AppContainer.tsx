import * as React from "react";
import {Router, browserHistory} from "react-router";
import adminRoutes from "../../admin/routes";
import homeRoutes from "../../preferences/routes";
import locationRoutes from '../../example/routes'
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { Provider } from 'react-redux'
import { appStore } from '../../store/AppStore'

interface AppContainerProps {
}

interface AppContainerState {
  isDrawerOpen: boolean;
}

export class AppContainer extends React.Component<AppContainerProps, AppContainerState> {
  //
  //  Must hold the same reference for routes collection through render invocations, else, react-router
  //  think we want to change the routes collection and raises a warning
  //
  routes: any[];

  constructor() {
    super();

    this.state = {
      isDrawerOpen: false,
    };

    this.routes = this.buildRoutes();
  }

  gotoHome() {
    this.setState({ isDrawerOpen: false });
    browserHistory.push("/");
  }

  gotoHome2() {
    this.setState({ isDrawerOpen: false });
    browserHistory.push("/preferences2");
  }

  gotoAbout() {
    this.setState({ isDrawerOpen: false });
    browserHistory.push("/about");
  }

  gotoLocations() {
    this.setState({ isDrawerOpen: false });
    browserHistory.push("/location");
  }

  toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  private buildRoutes(): any[] {
    let routes: any[] = [];

    routes = routes
      .concat(homeRoutes)
      .concat(adminRoutes)
      .concat(locationRoutes);

    return routes;
  }

  render() {
    return <Provider store={appStore}>
      <div>
        <AppBar
          title="SI&O Seed Project"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={() => this.toggleDrawer() } />

        {/*docked false makes the drawer to have an overlay which when being clicked the drawer is automatically closed */}
        <Drawer
          docked={false}
          open={this.state.isDrawerOpen}
          onRequestChange={(open) => this.setState({ isDrawerOpen: open }) }>
          <MenuItem onTouchTap={() => this.gotoHome() }>Preferences</MenuItem>
          <MenuItem onTouchTap={() => this.gotoHome2() }>Preferences 2</MenuItem>
          <MenuItem onTouchTap={() => this.gotoAbout() }>Admin</MenuItem>
          <MenuItem onTouchTap={() => this.gotoLocations() }>Locations</MenuItem>
        </Drawer>

        <Router history={browserHistory} routes={this.routes}>
        </Router>
      </div>
    </Provider>;
  }
}
