import * as React from "react";
import { NodeViewModelItem, ViewModelChanges } from "../NodeViewModelItem/NodeViewModelItem";
import { NodeViewModel } from "../../domain/Inner";
import styles from "./InnerNodeViewModel.css";

interface InnerNodeViewModelProps {
    nodeViewModel: NodeViewModel;
    onChangeViewModel({ changeType, itemName, itemDescription }: ViewModelChanges): void;
}

interface InnerNodeViewModelState {
    areViewModelVisible: boolean;
}

export class InnerNodeViewModel extends React.PureComponent<InnerNodeViewModelProps, InnerNodeViewModelState> {
    public state = {
        areViewModelVisible: false,
    };

    public render(): JSX.Element {
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
                            onChangeViewModelItem={this.handleChangeViewModelItem}
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

    private readonly handleChangeViewModelItem = ({ changeType, itemName, itemDescription }: ViewModelChanges) => {
        const { onChangeViewModel } = this.props;
        onChangeViewModel({ changeType, itemName, itemDescription });
    };
}
