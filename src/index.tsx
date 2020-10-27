import * as React from "react";
import * as ReactDOM from "react-dom";
import { InnerTree } from "./components/InnerTree/InnerTree";
import { Api } from "./api/Api";
import { convertInnerToInnerNode } from "./domain/ConverInnerToInnerNode";
import { Router, Switch, Route } from "react-router-dom";
import history from "./History";

const api = new Api();

async function renderInner() {
    ReactDOM.render(<h1>Loading...</h1>, document.querySelector(`#root`));
    const result = await api.getInner();

    const inner = convertInnerToInnerNode(result);

    return ReactDOM.render(
        <Router history={history}>
            <Switch>
                <Route path={"/"}>
                    <InnerTree api={api} inner={inner} />
                </Route>
            </Switch>
        </Router>,
        document.querySelector(`#root`),
    );
}

(async function () {
    try {
        await renderInner();
    } catch (err) {
        console.error(err);
    }
})();
