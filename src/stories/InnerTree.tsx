import * as React from "react";
import {InnerNode} from "./InnerNode";
import {InnerTreeProps} from "./InnerNodeViewModelItem";

export const InnerTree = (props: InnerTreeProps) => {
    const {inner} = props;

    return (
        <div className="inner-tree">
            <InnerNode key={inner.name} inner={inner}/>
        </div>
    )
}