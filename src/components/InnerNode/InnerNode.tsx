import * as React from "react";
import { InnerNodeViewModel } from "../InnerNodeViewModel/InnerNodeViewModel";
import { InnerNodeItem } from "../../domain/Inner";
import styles from "./InnerNode.css";
import { NodeChanges } from "../../domain/CreateChangeSet";
import { ViewModelChanges } from "../NodeViewModelItem/NodeViewModelItem";
import { ArrowTriangleDown, ArrowTriangleRight } from "@skbkontur/react-icons";

interface InnerNodeProps {
    node: InnerNodeItem;
    onChangeInnerNode({ nodeNames, changeType, itemName, itemDescription }: NodeChanges): void;
}

interface InnerNodeState {
    expanded: boolean;
}

export class InnerNode extends React.PureComponent<InnerNodeProps, InnerNodeState> {
    public state = {
        expanded: true,
    };

    public render() {
        const { node } = this.props;
        const { expanded } = this.state;

        return (
            <div className={styles.innerNode}>
                <div className={styles.label}>
                    <span onClick={this.handleChangeExpanded}>
                        {expanded || node.children.length === 0 ? <ArrowTriangleDown /> : <ArrowTriangleRight />}
                    </span>
                    <span className={styles.nodeName}>{node.name}</span>
                    {node.viewModel && (
                        <InnerNodeViewModel
                            nodeViewModel={node.viewModel}
                            onChangeViewModel={this.handleChangeViewModel}
                        />
                    )}
                </div>
                {expanded &&
                    node.children &&
                    node.children.map(child => {
                        return (
                            <InnerNode
                                key={child.name}
                                node={child}
                                onChangeInnerNode={this.handleChangeChildrenModel}
                            />
                        );
                    })}
            </div>
        );
    }

    private readonly handleChangeExpanded = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    private readonly handleChangeChildrenModel = ({
        nodeNames,
        changeType,
        itemName,
        itemDescription,
    }: NodeChanges) => {
        const { node, onChangeInnerNode } = this.props;

        onChangeInnerNode({
            nodeNames: [node.name, ...nodeNames],
            changeType: changeType,
            itemName: itemName,
            itemDescription: itemDescription,
        });
    };

    private readonly handleChangeViewModel = ({ changeType, itemName, itemDescription }: ViewModelChanges) => {
        const { node, onChangeInnerNode } = this.props;

        onChangeInnerNode({
            nodeNames: [node.name],
            changeType: changeType,
            itemName: itemName,
            itemDescription: itemDescription,
        });
    };
}
