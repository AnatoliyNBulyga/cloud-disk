import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Registration from "./registration/Registration";
import Navbar from "./navbar/Navbar";
import "./app.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          <Switch>
            <Route path="/registration" component={Registration} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
