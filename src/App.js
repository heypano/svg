import React from "react";
import Wrong from "./components/Wrong";
import Circle from "./components/Circle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cloud from "./components/Cloud";
import Window from "./components/Window";
import "./final.css";
import Cat from "./components/Cat";
import Test from "./components/Test";
import Draw from "./components/Draw";
import Paths from "./components/Paths";
import { Provider } from "react-redux";
import store from "./redux/store";
import Scratch from "./components/Scratch";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" render={() => <Draw />} />
            <Route exact path="/circle" component={Circle} />
            <Route exact path="/wrong" component={Wrong} />
            <Route exact path="/cloud" component={Cloud} />
            <Route exact path="/cat/:catName?" component={Cat} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/draw" component={Draw} />
            <Route exact path="/paths" component={Paths} />
            <Route exact path="/scratch" component={Scratch} />
            <Route exact path="/scratch/:text" component={Scratch} />
            <Route exact path="/window" component={Window} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
