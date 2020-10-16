import * as React from "react";
import { InnerNodeViewModel } from "../InnerNodeViewModel/InnerNodeViewModel";
import { InnerNodeItem } from "../../domain/Inner";
import styles from "./InnerNode.css";
import { ApiModel } from "../../Api";

interface InnerNodeProps {
    inner: InnerNodeItem;
    api: ApiModel;
    onChangeInner: () => void;
}

interface InnerNodeState {
    expanded: boolean;
}

export class InnerNode extends React.PureComponent<InnerNodeProps, InnerNodeState> {
    public state = {
        expanded: false,
    };

    public render() {
        const { inner, api, onChangeInner } = this.props;
        const { expanded } = this.state;

        return (
            <div className={styles.innerNode}>
                <input
                    className={styles.nodeName}
                    type="button"
                    value={expanded || inner.children.length === 0 ? "◢" : "▷"}
                    onClick={this.handleChangeExpanded}
                />
                <input className={styles.nodeName} value={inner.name} readOnly={true} />

                {inner.viewModel ? (
                    <InnerNodeViewModel
                        api={api}
                        nodeViewModel={inner.viewModel}
                        fullPath={inner.fullPath}
                        onChangeInner={onChangeInner}
                    />
                ) : (
                    ``
                )}

                {expanded && inner.children
                    ? inner.children.map(child => (
                          <InnerNode key={child.name} api={api} inner={child} onChangeInner={onChangeInner} />
                      ))
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
