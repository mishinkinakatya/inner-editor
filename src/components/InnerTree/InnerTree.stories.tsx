import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { InnerTree } from "./InnerTree";
import { InnerNodeItem } from "../../domain/Inner";
import { getApi } from "../../Api";

export default { title: "Inner Editor/InnerTree" } as Meta;

const testApi = {

}

const testInner: InnerNodeItem = {
    name: "First",
    viewModel: {
        value: "FirstValue",
        error: ["FirstError"],
    },
    children: [
        {
            name: "Second",
            viewModel: {
                error: ["SecondError"],
            },
            children: [
                {
                    name: "Fourth",
                    viewModel: {
                        value: "FourthValue",
                    },
                    children: [],
                },
            ],
        },
        {
            name: "Third",
            viewModel: {
                children: ["NullChild", "FirstChild"],
            },
            children: [],
        },
    ],
};

export const InnerTreeComponent = (): JSX.Element => <InnerTree api={getApi()} inner={testInner} />;
