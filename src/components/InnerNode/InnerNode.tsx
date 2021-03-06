import * as React from "react";
import { InnerNodeViewModel } from "../InnerNodeViewModel/InnerNodeViewModel";
import { InnerNodeItem } from "../../domain/Inner";
import styles from "./InnerNode.css";
import { NodeChanges } from "../../domain/CreateChangeSet";
import { ViewModelChanges } from "../NodeViewModelItem/NodeViewModelItem";
import { ArrowTriangleDown, ArrowTriangleRight, Edit } from "@skbkontur/react-icons";

interface InnerNodeProps {
    node: InnerNodeItem;
    onChangeInnerNode({ nodeNames, changeType, itemName, itemDescription }: NodeChanges): void;
}

interface InnerNodeState {
    expanded: boolean;
    visibility: boolean;
}

export class InnerNode extends React.PureComponent<InnerNodeProps, InnerNodeState> {
    public state = {
        expanded: true,
        visibility: false,
    };

    public render(): JSX.Element {
        const { node } = this.props;
        const { expanded, visibility } = this.state;

        return (
            <div className={styles.root}>
                {this.hasChildren() && expanded && <div className={styles.leftLine} />}
                <div className={styles.line1}>
                    {this.hasChildren() && (
                        <div className={styles.expandButton} onClick={this.handleChangeExpanded}>
                            {expanded ? <ArrowTriangleDown size={14} /> : <ArrowTriangleRight size={14} />}
                        </div>
                    )}
                    <div className={styles.nodeName} onClick={this.handleChangeExpanded}>
                        {node.name}
                    </div>
                    {this.isEditButtonVisible(node) && (
                        <div className={styles.editButton} onClick={this.handleChangePropsVisibility}>
                            <Edit size={14} />
                        </div>
                    )}
                    <div className={styles.props}>
                        {node.viewModel && (
                            <InnerNodeViewModel
                                nodeViewModel={node.viewModel}
                                visibility={visibility}
                                onChangeViewModel={this.handleChangeViewModel}
                            />
                        )}
                    </div>
                </div>
                <div className={styles.children}>
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
            </div>
        );
    }

    private hasChildren() {
        const { node } = this.props;
        return node.children.length !== 0;
    }

    private isEditButtonVisible(node: InnerNodeItem): boolean | undefined {
        return (
            node.viewModel &&
            (Object.keys(node.viewModel).length > 1 ||
                (Object.keys(node.viewModel).length === 1 && Object.keys(node.viewModel)[0] !== "value"))
        );
    }

    private readonly handleChangeExpanded = (): void => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };

    private readonly handleChangePropsVisibility = (): void => {
        this.setState({
            visibility: !this.state.visibility,
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
