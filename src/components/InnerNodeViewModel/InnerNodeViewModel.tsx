import * as React from "react";
import { NodeViewModelItem, ViewModelChanges } from "../NodeViewModelItem/NodeViewModelItem";
import { NodeViewModel } from "../../domain/Inner";
import styles from "./InnerNodeViewModel.css";

interface InnerNodeViewModelProps {
    nodeViewModel: NodeViewModel;
    onChangeViewModel({ changeType, itemName, itemDescription }: ViewModelChanges): void;
}

interface InnerNodeViewModelState {
    visible: boolean;
}

export class InnerNodeViewModel extends React.PureComponent<InnerNodeViewModelProps, InnerNodeViewModelState> {
    public state = {
        visible: false,
    };

    public render(): JSX.Element {
        const { nodeViewModel } = this.props;
        const { visible } = this.state;

        return visible ? (
            <div className={styles.viewModel}>
                <div>
                    <button className={styles.switchButton} onClick={this.handleChangeVisibleOfViewModel}>
                        ×
                    </button>
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
            <button className={styles.showPropsButton} onClick={this.handleChangeVisibleOfViewModel}>
                👁
            </button>
        );
    }

    private readonly handleChangeVisibleOfViewModel = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    private readonly handleChangeViewModelItem = ({ changeType, itemName, itemDescription }: ViewModelChanges) => {
        const { onChangeViewModel } = this.props;
        onChangeViewModel({
            changeType: changeType,
            itemName: itemName,
            itemDescription: itemDescription,
        });
    };
}
