import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { InnerNodeItem } from "../../domain/Inner";
import { InnerNode } from "./InnerNode";

export default { title: "Inner Editor/InnerNode" } as Meta;

const testInner: InnerNodeItem = {
    name: "First",
    viewModel: {
        value: "FirstValue",
        error: ["FirstError"],
    },
    children: [],
};

export const InnerNodeComponent = (): JSX.Element => <InnerNode inner={testInner} />;
