import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { App } from "./components/App/App";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path={`/ns/:ns/drafts/:drafts`} render={routeProps => <App {...routeProps} />}></Route>
        </Switch>
    </BrowserRouter>,
    document.querySelector(`#root`),
);
