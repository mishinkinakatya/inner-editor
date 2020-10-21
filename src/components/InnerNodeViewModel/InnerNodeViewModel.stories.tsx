import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { InnerNodeViewModel } from "./InnerNodeViewModel";
import { NodeViewModel } from "../../domain/Inner";
import { action } from "@storybook/addon-actions";

export default { title: "Inner Editor/InnerNodeViewModel" } as Meta;

const testViewModel: NodeViewModel = {
    value: "FirstValue",
    error: ["FirstError"],
};

export const InnerNodeViewModelComponent = (): JSX.Element => (
    <InnerNodeViewModel nodeViewModel={testViewModel} onChangeViewModel={action("onChangeViewModel")} />
);
