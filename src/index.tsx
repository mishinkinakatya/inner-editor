import * as React from "react";
import * as ReactDOM from "react-dom";
import {InnerTree} from "./components/InnerTree";
import {InnerNodeItem} from "./components/inner-editor";

const testInner: InnerNodeItem = {
    name: "First",
    viewModel: {
        value: "FirstValue",
        error: ["FirstError"],
    },
    children: [{
        name: "Second",
        viewModel: {
            error: ["SecondError"],
        },
        children: [{
            name: "Fourth",
            viewModel: {
                error: ["FourthError"],
            },
            children: []
        }]
    }, {
        name: "Third",
        viewModel: {
            children: ["NullChild", "FirstChild"],
        },
        children: []
    }
    ]
}

ReactDOM.render(
    <InnerTree inner={testInner}/>,
    document.querySelector(`#root`)
)