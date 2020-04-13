import React from "react";
import Wrong from "./components/Wrong";
import Circle from "./components/Circle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cloud from "./components/Cloud";
import "./final.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="container">
                <div className="row">
                  <Wrong />
                  <Circle />
                  {/*<Cloud />*/}
                </div>
              </div>
            )}
          />
          <Route exact path="/circle" component={Circle} />
          <Route exact path="/wrong" component={Wrong} />
          <Route exact path="/cloud" component={Cloud} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
