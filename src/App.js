import React from "react";
import Wrong from "./components/Wrong";
import Circle from "./components/Circle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cloud from "./components/Cloud";
import "./final.css";
import Cat from "./components/Cat";
import Test from "./components/Test";
import ClickPath from "./components/ClickPath";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <ClickPath />} />
          <Route exact path="/circle" component={Circle} />
          <Route exact path="/wrong" component={Wrong} />
          <Route exact path="/cloud" component={Cloud} />
          <Route exact path="/cat" component={Cat} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/clickpath" component={ClickPath} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
