import * as React from "react";
import { InnerNode } from "../InnerNode/InnerNode";
import { InnerNodeItem, PropertyDescription } from "../../domain/Inner";
import styles from "./InnerTree.css";
import { Path } from "../../domain/ConverInnerToInnerNode";
import { ChangeType, createChangeSet, NodeChanges } from "../../domain/CreateChangeSet";
import { ICandyApi } from "../../api/ICandyApi";

interface InnerTreeProps {
    api: ICandyApi;
    inner: InnerNodeItem;
}

interface InnerTreeState {
    rootNode: InnerNodeItem;
}
interface InnerChanges {
    inner: InnerNodeItem;
    nodeNames: Path;
    changeType: string;
    itemName: string;
    itemDescription?: PropertyDescription;
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
                        <InnerNode key={rootNode.name} node={rootNode} onChangeInnerNode={this.handleChangeInnerNode} />
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )}
            </>
        );
    }

    private readonly handleChangeInnerNode = ({ nodeNames, changeType, itemName, itemDescription }: NodeChanges) => {
        const { api } = this.props;
        const { rootNode } = this.state;

        const changeRootNode = (inner: InnerNodeItem) => {
            this.setState({
                rootNode: this.updateRootNode({ inner, nodeNames, changeType, itemName, itemDescription }),
            });
        };

        (async function () {
            try {
                await api.changeInnerNode(createChangeSet({ nodeNames, changeType, itemName, itemDescription }));
                changeRootNode({ ...rootNode });
            } catch (err) {
                console.error(err);
            }
        })();
    };

    private updateRootNode = ({
        inner,
        nodeNames,
        changeType,
        itemName,
        itemDescription,
    }: InnerChanges): InnerNodeItem => {
        let updatedNode = inner;
        let nodeNumber = 1;

        while (nodeNumber < nodeNames.length) {
            const newNode = updatedNode.children.find(x => x.name === nodeNames[nodeNumber]);
            updatedNode = newNode ? newNode : updatedNode;
            nodeNumber++;
        }
        if (updatedNode.viewModel) {
            if (changeType === ChangeType.CHANGED && itemDescription) {
                updatedNode.viewModel[itemName] = itemDescription;
            } else if (changeType === ChangeType.REMOVED) {
                delete updatedNode.viewModel[itemName];
            }
        }

        return inner;
    };
}
