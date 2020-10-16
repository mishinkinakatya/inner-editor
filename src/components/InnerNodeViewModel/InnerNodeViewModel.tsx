import * as React from "react";
import { NodeViewModelItem } from "../NodeViewModelItem/NodeViewModelItem";
import { InnerNodeItem, NodeViewModel } from "../../domain/Inner";
import styles from "./InnerNodeViewModel.css";
import { ApiModel } from "../../Api";

interface InnerNodeViewModelProps {
    nodeViewModel: NodeViewModel;
    fullPath: string;
    api: ApiModel;
    onChangeInner: () => void;
}

interface InnerNodeViewModelState {
    areViewModelVisible: boolean;
    currentViewModel: NodeViewModel;
}

export class InnerNodeViewModel extends React.PureComponent<InnerNodeViewModelProps, InnerNodeViewModelState> {
    public state = {
        areViewModelVisible: false,
        currentViewModel: this.props.nodeViewModel,
    };

    public render() {
        const { nodeViewModel, fullPath, api, onChangeInner } = this.props;
        const { areViewModelVisible } = this.state;

        return areViewModelVisible ? (
            <div className={styles.viewModel}>
                <div>
                    <input
                        className={styles.switchButton}
                        type="button"
                        value="×‍"
                        onClick={this.handleChangeVisibleOfViewModel}
                    />
                    {Object.keys(nodeViewModel).map(item => (
                        <NodeViewModelItem
                            key={item}
                            api={api}
                            itemName={item}
                            fullPath={fullPath}
                            itemDescription={nodeViewModel[item]}
                            onChangeInner={onChangeInner}
                        />
                    ))}
                </div>
            </div>
        ) : (
            <input
                className={styles.showPropsButton}
                type="button"
                value="👁‍"
                onClick={this.handleChangeVisibleOfViewModel}
            />
        );
    }

    private readonly handleChangeVisibleOfViewModel = () => {
        this.setState({
            areViewModelVisible: !this.state.areViewModelVisible,
        });
    };
}
