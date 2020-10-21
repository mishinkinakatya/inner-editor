import * as React from "react";
import { InnerNodeViewModel } from "../InnerNodeViewModel/InnerNodeViewModel";
import { InnerNodeItem } from "../../domain/Inner";
import styles from "./InnerNode.css";
import { Path } from "../../domain/ConverInnerToInnerNode";
import { NodeChanges } from "../../domain/CreateChangeSet";
import { ViewModelChanges } from "../NodeViewModelItem/NodeViewModelItem";

interface InnerNodeProps {
    currentNode: InnerNodeItem;
    nodeNames: Path;
    onChangeInnerNode({ changeType, itemName, nodeNames, itemDescription }: NodeChanges): void;
}

interface InnerNodeState {
    expanded: boolean;
}

export class InnerNode extends React.PureComponent<InnerNodeProps, InnerNodeState> {
    public state = {
        expanded: false,
    };

    public render(): JSX.Element {
        const { currentNode, nodeNames, onChangeInnerNode } = this.props;
        const { expanded } = this.state;

        return (
            <div className={styles.innerNode}>
                <input
                    className={styles.nodeName}
                    type="button"
                    value={expanded || currentNode.children.length === 0 ? "◢" : "▷"}
                    onClick={this.handleChangeExpanded}
                />
                <input className={styles.nodeName} value={currentNode.name} readOnly={true} />

                {currentNode.viewModel ? (
                    <InnerNodeViewModel
                        nodeViewModel={currentNode.viewModel}
                        onChangeViewModel={this.handleChangeViewModel}
                    />
                ) : (
                    ``
                )}

                {expanded && currentNode.children
                    ? currentNode.children.map(child => {
                          const nodeNamesWithCurrentNode = [...nodeNames, child.name];

                          return (
                              <InnerNode
                                  key={child.name}
                                  currentNode={child}
                                  nodeNames={nodeNamesWithCurrentNode}
                                  onChangeInnerNode={onChangeInnerNode}
                              />
                          );
                      })
                    : ``}
            </div>
        );
    }

    private readonly handleChangeExpanded = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    private readonly handleChangeViewModel = ({ changeType, itemName, itemDescription }: ViewModelChanges) => {
        const { nodeNames, onChangeInnerNode } = this.props;
        onChangeInnerNode({ changeType, itemName, nodeNames, itemDescription });
    };
}
