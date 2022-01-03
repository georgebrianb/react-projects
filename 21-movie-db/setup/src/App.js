import React from "react";
// after importing react-router into the index.js and wrapp the <App/> component in it
// we can come here and import the Switch component that will be used to the the switching between different
// pages / routes
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Movie from "./SingleMovie";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies/:id" children={<Movie />} />
    </Switch>
  );
}

export default App;
