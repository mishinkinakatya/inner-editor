import * as React from "react";
import {InnerNode, InnerNodeItem} from "./InnerNode";

export interface InnerTreeProps {
    inner: InnerNode;
}

export const InnerTree = (props: InnerTreeProps) => {
    const {inner} = props;

    return (
        <div className="inner-tree">
            <InnerNodeItem key={inner.name} inner={inner}/>
        </div>
    )
}