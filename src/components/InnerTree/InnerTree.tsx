import * as React from "react";
import { InnerNode } from "../InnerNode/InnerNode";
import { InnerNodeItem } from "../../domain/Inner";
import styles from "./InnerTree.css";
import { NodeChanges } from "../../domain/CreateChangeSet";

interface InnerTreeProps {
    rootNode: InnerNodeItem;
    onChangeInnerTree({ nodeNames, changeType, itemName, itemDescription }: NodeChanges): void;
}

export class InnerTree extends React.PureComponent<InnerTreeProps> {
    public render(): JSX.Element {
        const { rootNode } = this.props;

        return (
            <div className={styles.innerTree}>
                <InnerNode key={rootNode.name} node={rootNode} onChangeInnerNode={this.handleChangeInnerNode} />
            </div>
        );
    }

    private readonly handleChangeInnerNode = ({ nodeNames, changeType, itemName, itemDescription }: NodeChanges) => {
        const { onChangeInnerTree } = this.props;
        onChangeInnerTree({
            nodeNames: nodeNames,
            changeType: changeType,
            itemName: itemName,
            itemDescription: itemDescription,
        });
    };
}
