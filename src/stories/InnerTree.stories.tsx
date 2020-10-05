import * as React from 'react';
import './inner-tree.css';

import {Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {InnerNodeItem, NodeViewModel} from "./InnerNodeViewModelItem";
import {InnerTree} from "./InnerTree";

export default {title: 'Inner Editor/InnerTree'} as Meta;


// type Inner = { [path: string]: NodeViewModel }
//
// function convertInnerToInnerNode(inner: Inner): NodeViewModel {
//     return;
// }


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

export const InnerTreeComponent = (): JSX.Element => <InnerTree inner={testInner}/>;
