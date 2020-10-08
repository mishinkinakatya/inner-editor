import * as React from 'react';
import '../styles/inner-tree.css';

import {Meta} from '@storybook/react/types-6-0';
import {InnerNodeViewModel} from "../components/InnerNodeViewModel";
import {NodeViewModel} from "../components/inner-editor";

export default {title: 'Inner Editor/InnerNodeViewModel'} as Meta;

const testViewModel: NodeViewModel = {
    value: "FirstValue",
    error: ["FirstError"],
}

export const InnerNodeViewModelComponent = (): JSX.Element => <InnerNodeViewModel nodeViewModel={testViewModel}/>;
