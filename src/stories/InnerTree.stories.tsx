import * as React from 'react';
import './inner-tree.css';

import {Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {InnerTree} from "./InnerTree";
import {InnerNode} from "./InnerNode";
import {NodeViewModel, NodeViewModelItem} from "./InnerViewModel";

export default {title: 'Inner Editor/InnerTree'} as Meta;


type Inner = { [path: string]: NodeViewModel }

function convertInnerToInnerNode(inner: Inner): NodeViewModel {
    return;
}


const testInner: InnerNode = {
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