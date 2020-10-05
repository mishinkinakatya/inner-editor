import * as React from 'react';
import './inner-tree.css';

import {Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {NodeViewModel, NodeViewModelItem} from "./InnerViewModel";

export default {title: 'Inner Editor/InnerViewModel'} as Meta;


export const NodeViewModelComponent = (): JSX.Element => <NodeViewModelItem itemName="itemName"
                                                                        itemDescription="ItemDescription"/>;
