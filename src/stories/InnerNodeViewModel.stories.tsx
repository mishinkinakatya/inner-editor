import * as React from 'react';
import './inner-tree.css';

import {Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {InnerNodeItem, InnerNodeViewModelItem, NodeViewModel} from "./InnerNodeViewModelItem";
import {InnerNodeViewModel} from "./InnerNodeViewModel";

export default {title: 'Inner Editor/InnerNodeViewModel'} as Meta;

const testViewModel: NodeViewModel = {
    value: "FirstValue",
    error: ["FirstError"],
}

export const InnerNodeViewModelComponent = (): JSX.Element => <InnerNodeViewModel nodeViewModel={testViewModel}/>;
