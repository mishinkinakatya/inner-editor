import { Title } from "./Title";
import * as React from "react";

export function X3Screen(props: { id: string }): JSX.Element {
    return (
        <>
            <Title>XS Title</Title>
            We are in xs
            <div>=======</div>
            <div>{props.id}</div>
        </>
    );
}
