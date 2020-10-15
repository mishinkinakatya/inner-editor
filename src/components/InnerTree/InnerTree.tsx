import * as React from "react";
import { InnerNode } from "../InnerNode/InnerNode";
import { InnerNodeItem } from "../../domain/Inner";

import styles from "./InnerTree.css";

interface InnerTreeProps {
    api: object;
    inner: InnerNodeItem;
}

export function InnerTree(props: InnerTreeProps) {
    const { inner } = props;

    return (
        <>
            <h1>Inner Editor</h1>
            <div className={styles.innerTree}>
                <InnerNode key={inner.name} inner={inner} />
            </div>
        </>
    );
}
