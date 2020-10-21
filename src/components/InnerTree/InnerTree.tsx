import * as React from "react";
import { InnerNode } from "../InnerNode/InnerNode";
import { InnerNodeItem, PropertyDescription } from "../../domain/Inner";
import styles from "./InnerTree.css";
import { ApiModel } from "../../Api";
import { Path } from "../../domain/ConverInnerToInnerNode";
import { ChangeType, createChangeSet } from "../../domain/CreateChangeSet";

interface InnerTreeProps {
    api: ApiModel;
    inner: InnerNodeItem;
}

interface InnerTreeState {
    rootNode: InnerNodeItem;
}

export class InnerTree extends React.PureComponent<InnerTreeProps, InnerTreeState> {
    public state = {
        rootNode: this.props.inner,
    };

    public render(): JSX.Element {
        const { rootNode } = this.state;

        return (
            <>
                <h1>Inner Editor</h1>
                {rootNode ? (
                    <div className={styles.innerTree}>
                        <InnerNode
                            key={rootNode.name}
                            nodeNames={[rootNode.name]}
                            currentNode={rootNode}
                            onChangeInnerNode={this.handleChangeInnerNode}
                        />
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )}
            </>
        );
    }

    private readonly handleChangeInnerNode = (
        changeType: string,
        itemName: string,
        nodeNames: Path,
        itemDescription?: PropertyDescription,
    ) => {
        const { api } = this.props;
        const { rootNode } = this.state;

        const changeRootNode = (inner: InnerNodeItem) => {
            this.setState({
                rootNode: this.updateRootNode(inner, changeType, itemName, nodeNames, itemDescription),
            });
        };

        (async function () {
            try {
                await api.changeInnerNode(createChangeSet({ changeType, itemName, nodeNames, itemDescription }));
                changeRootNode({ ...rootNode });
            } catch (err) {
                console.error(err);
            }
        })();
    };

    private updateRootNode = (
        inner: InnerNodeItem,
        changeType: string,
        itemName: string,
        nodeNames: Path,
        itemDescription?: PropertyDescription,
    ): InnerNodeItem => {
        let updatedNode = inner;
        let nodeNumber = 1;

        //TODO Избавиться от while
        while (nodeNumber < nodeNames.length) {
            updatedNode = updatedNode.children.find(x => x.name === nodeNames[nodeNumber]);
            nodeNumber++;
        }

        if (changeType === ChangeType.CHANGED && itemDescription) {
            updatedNode.viewModel[itemName] = itemDescription;
        } else if (changeType === ChangeType.REMOVED) {
            delete updatedNode.viewModel[itemName];
        }

        return inner;
    };
}
