import * as React from "react";
import { NodeViewModelItem, ViewModelChanges } from "../NodeViewModelItem/NodeViewModelItem";
import { NodeViewModel } from "../../domain/Inner";
import styles from "./InnerNodeViewModel.css";

interface InnerNodeViewModelProps {
    nodeViewModel: NodeViewModel;
    onChangeViewModel({ changeType, itemName, itemDescription }: ViewModelChanges): void;
}

interface InnerNodeViewModelState {
    visibility: boolean;
}

export class InnerNodeViewModel extends React.PureComponent<InnerNodeViewModelProps, InnerNodeViewModelState> {
    public state = {
        visibility: false,
    };

    public render(): JSX.Element {
        const { nodeViewModel } = this.props;
        const { visibility } = this.state;

        return (
            <div className={styles.viewModel}>
                {visibility || Object.keys(nodeViewModel).length === 1 ? (
                    <div>
                        {Object.keys(nodeViewModel).map(item => (
                            <NodeViewModelItem
                                key={item}
                                itemName={item}
                                itemDescription={nodeViewModel[item]}
                                onChangeViewModelItem={this.handleChangeViewModelItem}
                            />
                        ))}
                    </div>
                ) : (
                    Object.hasOwnProperty.call(nodeViewModel, "value") && (
                        <div>
                            <NodeViewModelItem
                                itemName="value"
                                itemDescription={nodeViewModel["value"]}
                                onChangeViewModelItem={this.handleChangeViewModelItem}
                            />
                        </div>
                    )
                )}

                {this.renderActionButtons(visibility, nodeViewModel)}
            </div>
        );
    }

    private renderActionButtons(visibility: boolean, nodeViewModel: NodeViewModel) {
        return visibility ? (
            <a className={styles.showButton} onClick={this.handleChangePropsVisibility}>
                Show less
            </a>
        ) : (
            Object.keys(nodeViewModel).length > 1 && (
                <a className={styles.showButton} onClick={this.handleChangePropsVisibility}>
                    Show more
                </a>
            )
        );
    }

    private readonly handleChangePropsVisibility = () => {
        this.setState({
            visibility: !this.state.visibility,
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
