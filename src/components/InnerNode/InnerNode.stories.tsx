import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { InnerNode } from "./InnerNode";
import { action } from "@storybook/addon-actions";

export default { title: "Inner Editor/InnerNode" } as Meta;

export const InnerNodeComponent = (): JSX.Element => (
    <InnerNode
        node={{
            name: "First ",
            viewModel: {
                value: "FirstValue",
                error: ["FirstError"],
            },
            children: [],
        }}
        onChangeInnerNode={action("onChangeInnerNode")}
    />
);

export const SomePropsWithValue = (): JSX.Element => (
    <InnerNode
        node={{
            name: "First ",
            viewModel: {
                value: "FirstValue",
                error: ["FirstError"],
            },
            children: [],
        }}
        onChangeInnerNode={action("onChangeInnerNode")}
    />
);

export const SomePropsWithoutValue = (): JSX.Element => (
    <InnerNode
        node={{
            name: "First ",
            viewModel: {
                children: ["FirstChildren"],
                error: ["FirstError"],
            },
            children: [],
        }}
        onChangeInnerNode={action("onChangeInnerNode")}
    />
);

export const OnePropNotValue = (): JSX.Element => (
    <InnerNode
        node={{
            name: "First ",
            viewModel: {
                error: ["FirstError"],
            },
            children: [],
        }}
        onChangeInnerNode={action("onChangeInnerNode")}
    />
);

export const OnlyValueProp = (): JSX.Element => (
    <InnerNode
        node={{
            name: "First ",
            viewModel: {
                value: "FirstValue",
            },
            children: [],
        }}
        onChangeInnerNode={action("onChangeInnerNode")}
    />
);

export const WithoutProps = (): JSX.Element => (
    <InnerNode
        node={{
            name: "First ",
            viewModel: undefined,
            children: [],
        }}
        onChangeInnerNode={action("onChangeInnerNode")}
    />
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
            viewModel: { resourcesHash: 111 },
            children: [
                {
                    name: "AAA",
                    viewModel: {
                        error: ["FirstError"],
                    },
                    children: [
                        {
                            name: "CCC",
                            viewModel: undefined,
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
