import * as React from "react";
import styles from "./NodeViewModelItem.css";

enum NodeViewModelMode {
    Read,
    Edit,
}

interface NodeViewModelItemProps {
    itemName: string;
    itemDescription: string | string[];
    onChangeViewModel: () => void;
}

interface NodeViewModelItemState {
    currentMode: NodeViewModelMode;
    currentDescription: string | string[];
}

export class NodeViewModelItem extends React.PureComponent<NodeViewModelItemProps, NodeViewModelItemState> {
    public state = {
        currentMode: NodeViewModelMode.Read,
        currentDescription: this.props.itemDescription,
    };

    public render() {
        const { itemName, itemDescription } = this.props;
        const { currentMode, currentDescription } = this.state;

        return (
            <div className={styles.viewModelItem}>
                <span className={styles.propertyName}>{itemName}: </span>
                {currentMode === NodeViewModelMode.Read ? (
                    <div>
                        <input className={styles.propertyValue} value={itemDescription} disabled={true} />
                        <input type="button" value="✏" onClick={this.handleEditButtonClick} />
                    </div>
                ) : (
                    <div>
                        <input
                            className={styles.propertyValue}
                            value={currentDescription}
                            onChange={this.handleChangeItemDescription}
                        />
                        <input type="button" value="V" onClick={this.handleSaveButtonClick} />
                        <input type="button" value="↶" onClick={this.handleCancelButtonClick} />
                        <input type="button" value="X" />
                    </div>
                )}
            </div>
        );
    }

    private readonly handleEditButtonClick = () => {
        this.setState({
            currentMode: NodeViewModelMode.Edit,
        });
    };

    private readonly handleChangeItemDescription = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentDescription: evt.target.value,
        });
    };

    private readonly handleSaveButtonClick = () => {
        const { onChangeViewModel } = this.props;

        const newDescription = this.state.currentDescription;

        if (newDescription != undefined) {
            this.setState({
                currentMode: NodeViewModelMode.Read,
                currentDescription: newDescription,
            });
        }

        onChangeViewModel();
    };

    private readonly handleCancelButtonClick = () => {
        const { onChangeViewModel } = this.props;

        this.setState({
            currentMode: NodeViewModelMode.Read,
            currentDescription: this.props.itemDescription,
        });

        onChangeViewModel();
    };
}
