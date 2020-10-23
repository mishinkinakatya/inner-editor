import * as React from "react";
import { InnerNodeViewModel } from "../InnerNodeViewModel/InnerNodeViewModel";
import { InnerNodeItem } from "../../domain/Inner";
import styles from "./InnerNode.css";
import { NodeChanges } from "../../domain/CreateChangeSet";
import { ViewModelChanges } from "../NodeViewModelItem/NodeViewModelItem";
import { Path } from "../../domain/ConverInnerToInnerNode";

interface InnerNodeProps {
    node: InnerNodeItem;
    nodeNames: Path;
    onChangeInnerNode({ nodeNames, changeType, itemName, itemDescription }: NodeChanges): void;
}

interface InnerNodeState {
    expanded: boolean;
}

export class InnerNode extends React.PureComponent<InnerNodeProps, InnerNodeState> {
    public state = {
        expanded: true,
    };

    public render(): JSX.Element {
        const { node, nodeNames, onChangeInnerNode } = this.props;
        const { expanded } = this.state;

        return (
            <div className={styles.innerNode}>
                <input
                    className={styles.expandButton}
                    type="button"
                    value={expanded || node.children.length === 0 ? "◢" : "▷"}
                    onClick={this.handleChangeExpanded}
                />
                <input className={styles.nodeName} value={node.name} readOnly={true} />

                {node.viewModel && (
                    <InnerNodeViewModel nodeViewModel={node.viewModel} onChangeViewModel={this.handleChangeViewModel} />
                )}

                {expanded && node.children
                    ? node.children.map(child => {
                          const nodeNamesWithCurrentNode = [...nodeNames, child.name];

                          return (
                              <InnerNode
                                  key={child.name}
                                  node={child}
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
        onChangeInnerNode({ nodeNames, changeType, itemName, itemDescription });
    };
}
