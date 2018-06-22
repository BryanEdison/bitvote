import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import ShowElection from './Election';
import NewElection from './NewElection';


export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/elections/:address" component={ShowElection} />
          <Route exact path="/createelection" component={NewElection} />
        </Switch>
      </div>
    );
  }
}
