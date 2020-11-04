import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { InnerNodeItem } from "../../domain/Inner";
import { InnerNode } from "./InnerNode";
import { action } from "@storybook/addon-actions";

export default { title: "Inner Editor/InnerNode" } as Meta;

const testInner: InnerNodeItem = {
    name: "First ",
    viewModel: {
        value: "FirstValue",
        error: ["FirstError"],
    },
    children: [],
};

export const InnerNodeComponent = (): JSX.Element => (
    <InnerNode node={testInner} onChangeInnerNode={action("onChangeInnerNode")} />
);

export const LongNodeName = (): JSX.Element => (
    <InnerNode
        node={{
            name: "First First First First ",
            viewModel: {
                value: "FirstValue",
                error: ["FirstError"],
            },
            children: [],
        }}
        onChangeInnerNode={action("onChangeInnerNode")}
    />
);

export const TwoItems = (): JSX.Element => (
    <InnerNode
        node={{
            name: "R",
            viewModel: undefined,
            children: [
                {
                    name: "AAA",
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
export const ManyItems = (): JSX.Element => (
    <InnerNode
        node={{
            name: "R",
            viewModel: undefined,
            children: [
                {
                    name: "AAA",
                    viewModel: {
                        value: "FirstValue",
                        error: ["FirstError"],
                    },
                    children: [
                        {
                            name: "CCC",
                            viewModel: {
                                value: "ThirdValue",
                                error: ["ThirdError"],
                            },
                            children: [
                                {
                                    name: "DDD",
                                    viewModel: {
                                        value: "FourValue",
                                        error: ["FourError"],
                                    },
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "BBB",
                    viewModel: {
                        value: "SecondValue",
                        error: ["SecondError"],
                    },
                    children: [],
                },
            ],
        }}
        onChangeInnerNode={action("onChangeInnerNode")}
    />
);
