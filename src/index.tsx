import * as React from "react";
import * as ReactDOM from "react-dom";
import { InnerTree } from "./components/InnerTree/InnerTree";
import { getApi } from "./Api";

const api = getApi();

ReactDOM.render(<InnerTree api={api} />, document.querySelector(`#root`));
