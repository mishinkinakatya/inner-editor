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
        onChangeViewModel={action("onChangeViewModel")}
    />
);
export const OnePropertyValue = (): JSX.Element => (
    <InnerNodeViewModel
        nodeViewModel={{
            value: "FirstValue",
        }}
        onChangeViewModel={action("onChangeViewModel")}
    />
);
export const onePropertyChildren = (): JSX.Element => (
    <InnerNodeViewModel
        nodeViewModel={{
            children: ["0", "1"],
        }}
        onChangeViewModel={action("onChangeViewModel")}
    />
);
export const oneAnyProperty = (): JSX.Element => (
    <InnerNodeViewModel
        nodeViewModel={{
            prop: "some prop",
        }}
        onChangeViewModel={action("onChangeViewModel")}
    />
);
export const twoPropertiesWithoutAny = (): JSX.Element => (
    <InnerNodeViewModel
        nodeViewModel={{
            children: ["0", "1"],
            error: ["FirstError"],
        }}
        onChangeViewModel={action("onChangeViewModel")}
    />
);