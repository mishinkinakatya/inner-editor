import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { InnerNodeItem } from "../../domain/Inner";
import { InnerNode } from "./InnerNode";
import { action } from "@storybook/addon-actions";

export default { title: "Inner Editor/InnerNode" } as Meta;

const testInner: InnerNodeItem = {
    name: "First",
    viewModel: {
        value: "FirstValue",
        error: ["FirstError"],
    },
    children: [],
};

export const InnerNodeComponent = (): JSX.Element => (
    <InnerNode node={testInner} onChangeInnerNode={action("onChangeInnerNode")} />
);

export const TwoItems = (): JSX.Element => (
    <InnerNode
        node={{
            name: "R",
            viewModel: undefined,
            children: [
                {
                    name: "A",
                    viewModel: {
                        value: "FirstValue",
                        error: ["FirstError"],
                    },
                    children: [],
                },
            ],
        }}
        onChangeInnerNode={action("onChangeInnerNode")}
    />
);
