import * as React from "react";
import * as ReactDOM from "react-dom";
import { InnerTree } from "./components/InnerTree/InnerTree";
import { Api } from "./api/Api";
import { convertInnerToInnerNode } from "./domain/ConverInnerToInnerNode";

const api = new Api();

async function renderInner() {
    ReactDOM.render(<h1>Loading...</h1>, document.querySelector(`#root`));
    const result = await api.getInner();

    const inner = convertInnerToInnerNode(result);
    return ReactDOM.render(<InnerTree api={api} inner={inner} />, document.querySelector(`#root`));
}

(async function () {
    try {
        await renderInner();
    } catch (err) {
        console.error(err);
    }
})();
