import { BrowserRouter, Switch, Route } from "react-router-dom";

import React from "react";
import PokemonList from "./component/PokemonList/index";
import Info from "./pages/Info";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PokemonList} />
        <Route path="/:id" component={Info} />
      </Switch>
    </BrowserRouter>
  );
}
