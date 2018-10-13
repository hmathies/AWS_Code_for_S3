import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import CONFIG from "config";
import { Login } from "./components/common/login";
import { TopNav, LeftNav } from "./components/importer/nav";
import Overview from "./components/importer/overview";
import Data from "./components/importer/data";
import Settings from "./components/importer/settings";
import PageContent from "./components/importer/page_content";
import OauthSuccess from "./components/common/oauth_success";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default class MainApp extends React.PureComponent {
  constructor() {
    super();
    this.system = {
      url: CONFIG.API_URL
    };
    this.state = { nav: "overview", settings: {} };
  }

  changeTab(tab) {
    this.setState({ nav: tab });
  }

  setOrg(org) {
    const { account } = this.state;
    account.org = org;
    this.setState({ account });
  }

  setSettings(settings) {
    this.setState({ settings });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard/importer/oauth" component={OauthSuccess} />
          <Router>
            <Login system={this.system}>
              <Redirect
                from="/dashboard/importer"
                to="/dashboard/importer/overview"
              />
              <div className="Container">
                <PageContent
                  component={LeftNav}
                  changeTab={this.changeTab}
                  nav={this.state.nav}
                  settings={this.state.settings}
                />
                <div className="Dashboard">
                  <PageContent
                    component={TopNav}
                    setOrg={this.setOrg}
                    settings={this.state.settings}
                  />
                  <Switch>
                    <PageContent
                      path="/dashboard/importer/overview"
                      component={Overview}
                    />
                    <PageContent
                      path="/dashboard/importer/data"
                      component={Data}
                    />
                    <PageContent
                      path="/dashboard/importer/settings"
                      component={Settings}
                    />
                  </Switch>
                </div>
              </div>
            </Login>
          </Router>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<MainApp />, document.getElementById("content"));
