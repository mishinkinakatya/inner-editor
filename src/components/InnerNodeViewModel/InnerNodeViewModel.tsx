import * as React from "react";
import { NodeViewModelItem } from "../NodeViewModelItem/NodeViewModelItem";
import { NodeViewModel } from "../../domain/Inner";
import styles from "./InnerNodeViewModel.css";

interface InnerNodeViewModelProps {
    nodeViewModel: NodeViewModel;
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
        const { nodeViewModel } = this.props;
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
                            itemName={item}
                            itemDescription={nodeViewModel[item]}
                            onChangeViewModel={this.handleChangeViewModel}
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

    private handleChangeViewModel = () => {};

    private readonly handleChangeVisibleOfViewModel = () => {
        this.setState({
            areViewModelVisible: !this.state.areViewModelVisible,
        });
    };
}
