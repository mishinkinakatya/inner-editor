import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { NodeViewModelItem } from "./NodeViewModelItem";
import { action } from "@storybook/addon-actions";

export default { title: "Inner Editor/NodeViewModelItem" } as Meta;

export const NodeViewModelItemComponent = (): JSX.Element => (
    <NodeViewModelItem
        itemName="itemName"
        itemDescription="ItemDescription"
        onChangeViewModel={action("onChangeViewModel")}
    />
);
