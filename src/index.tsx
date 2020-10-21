import * as React from "react";
import * as ReactDOM from "react-dom";
import { InnerTree } from "./components/InnerTree/InnerTree";
import { getApi } from "./Api";
import { convertInnerToInnerNode } from "./domain/ConverInnerToInnerNode";

const api = getApi();

async function getInner() {
    ReactDOM.render(<h1>Loading...</h1>, document.querySelector(`#root`));
    const result = await api.getInner();

    const inner = convertInnerToInnerNode(result);
    return ReactDOM.render(<InnerTree api={api} inner={inner} />, document.querySelector(`#root`));
}

(async function () {
    try {
        await getInner();
    } catch (err) {
        console.error(err);
    }
})();
