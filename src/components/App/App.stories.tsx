import * as React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { InnerNodeItem } from "../../domain/Inner";
import { Input } from "@skbkontur/react-ui/components/Input";

export default { title: "Inner Editor/App" } as Meta;

const testInner: InnerNodeItem = {
    name: "First",
    viewModel: {
        value: "FirstValue",
        error: ["FirstError"],
    },
    children: [],
};

// export const AppComponent = () => <Input />;
