import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { InnerNodeViewModel } from "./InnerNodeViewModel";
import { action } from "@storybook/addon-actions";

export default { title: "Inner Editor/InnerNodeViewModel" } as Meta;

export const TwoProperties = (): JSX.Element => (
    <InnerNodeViewModel
        nodeViewModel={{
            value: "FirstValue",
            error: ["FirstError"],
        }}
        visibility={true}
        onChangeViewModel={action("onChangeViewModel")}
    />
);
export const OnePropertyValue = (): JSX.Element => (
    <InnerNodeViewModel
        nodeViewModel={{
            value: "FirstValue",
        }}
        visibility={true}
        onChangeViewModel={action("onChangeViewModel")}
    />
);
export const onePropertyNotValueVisible = (): JSX.Element => (
    <InnerNodeViewModel
        nodeViewModel={{
            children: ["0", "1"],
        }}
        visibility={true}
        onChangeViewModel={action("onChangeViewModel")}
    />
);
export const onePropertyNotValueNoVisible = (): JSX.Element => (
    <InnerNodeViewModel
        nodeViewModel={{
            children: ["0", "1"],
        }}
        visibility={false}
        onChangeViewModel={action("onChangeViewModel")}
    />
);
