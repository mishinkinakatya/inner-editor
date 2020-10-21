import * as React from "react";
import styles from "./NodeViewModelItem.css";
import { PropertyDescription } from "../../domain/Inner";
import { ChangeType } from "../../domain/CreateChangeSet";

enum NodeViewModelMode {
    Read,
    Edit,
}

export interface ViewModelChanges {
    changeType: string;
    itemName: string;
    itemDescription?: PropertyDescription;
}

interface NodeViewModelItemProps {
    itemName: string;
    itemDescription: PropertyDescription;
    onChangeViewModelItem({ changeType, itemName, itemDescription }: ViewModelChanges): void;
}

interface NodeViewModelItemState {
    currentMode: NodeViewModelMode;
    currentItemName: string | undefined;
    currentDescription: PropertyDescription;
}

export class NodeViewModelItem extends React.PureComponent<NodeViewModelItemProps, NodeViewModelItemState> {
    public state = {
        currentMode: NodeViewModelMode.Read,
        currentItemName: this.props.itemName,
        currentDescription: this.props.itemDescription,
    };

    public render(): JSX.Element {
        const { currentMode, currentItemName, currentDescription } = this.state;

        let item;
        if (currentItemName) {
            item = (
                <>
                    <span className={styles.propertyName}>{currentItemName}: </span>;
                    {currentMode === NodeViewModelMode.Read ? (
                        <div>
                            <input className={styles.propertyValue} value={currentDescription} disabled={true} />
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
                            <input type="button" value="X" onClick={this.handleDeleteButtonClick} />
                        </div>
                    )}
                </>
            );
        } else {
            item = undefined;
        }

        return <div className={styles.viewModelItem}>{item}</div>;
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
        const { onChangeViewModelItem } = this.props;
        const { currentItemName, currentDescription } = this.state;

        onChangeViewModelItem({
            changeType: ChangeType.CHANGED,
            itemName: currentItemName,
            itemDescription: currentDescription,
        });

        this.setState({
            currentMode: NodeViewModelMode.Read,
            currentDescription,
        });
    };

    private readonly handleDeleteButtonClick = () => {
        const { onChangeViewModelItem } = this.props;
        const { currentItemName } = this.state;

        onChangeViewModelItem({ changeType: ChangeType.REMOVED, itemName: currentItemName });

        this.setState({
            currentItemName: undefined,
        });
    };

    private readonly handleCancelButtonClick = () => {
        this.setState({
            currentMode: NodeViewModelMode.Read,
            currentDescription: this.props.itemDescription,
        });
    };
}
