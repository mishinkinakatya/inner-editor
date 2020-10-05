import * as React from 'react';
import './inner-tree.css';

import {Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {InnerNodeViewModelItem} from "./InnerNodeViewModelItem";

export default {title: 'Inner Editor/InnerNodeViewModelItem'} as Meta;


export const InnerNodeViewModelItemComponent = (): JSX.Element => <InnerNodeViewModelItem itemName="itemName"
                                                                                          itemDescription="ItemDescription"/>;
