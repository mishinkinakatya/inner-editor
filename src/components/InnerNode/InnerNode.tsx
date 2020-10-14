import * as React from "react";
import { InnerNodeViewModel } from "../InnerNodeViewModel/InnerNodeViewModel";
import { InnerNodeItem } from "../../domain/Inner";
import styles from "./InnerNode.css";

interface InnerNodeProps {
    inner: InnerNodeItem;
}

interface InnerNodeState {
    expanded: boolean;
}

export class InnerNode extends React.PureComponent<InnerNodeProps, InnerNodeState> {
    public state = {
        expanded: false,
    };

    public render() {
        const { inner } = this.props;
        const { expanded } = this.state;

        return (
            <div className={styles.innerNode}>
                <input
                    className={styles.nodeName}
                    type="button"
                    value={expanded || inner.children == undefined ? "◢" : "▷"}
                    onClick={this.handleChangeExpanded}
                />
                <input className={styles.nodeName} value={inner.name} readOnly={true} />

                {inner.viewModel ? <InnerNodeViewModel nodeViewModel={inner.viewModel} /> : ``}

                {expanded && inner.children
                    ? inner.children.map(child => <InnerNode key={child.name} inner={child} />)
                    : ``}
            </div>
        );
    }

    private readonly handleChangeExpanded = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };
}
