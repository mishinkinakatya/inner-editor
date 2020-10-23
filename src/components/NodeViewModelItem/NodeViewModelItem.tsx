import * as React from "react";
import styles from "./NodeViewModelItem.css";
import { PropertyDescription } from "../../domain/Inner";
import { ChangeType } from "../../domain/CreateChangeSet";

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
    name: string | undefined;
    description: PropertyDescription;
}

export class NodeViewModelItem extends React.PureComponent<NodeViewModelItemProps, NodeViewModelItemState> {
    public state = {
        name: this.props.itemName,
        description: this.props.itemDescription,
    };

    public render(): JSX.Element {
        const { name, description } = this.state;

        return (
            <div className={styles.viewModelItem}>
                <span className={styles.propertyName}>{name}: </span>
                <input
                    className={styles.propertyValue}
                    value={description}
                    onChange={this.handleChangeItemDescription}
                />
                <div className={styles.actionButtons}>
                    <input
                        className={styles.actionButton}
                        type="button"
                        value="Save"
                        onClick={this.handleSaveButtonClick}
                    />
                    <input
                        className={styles.actionButton}
                        type="button"
                        value="Cancel"
                        onClick={this.handleCancelButtonClick}
                    />
                    <input
                        className={styles.actionButton}
                        type="button"
                        value="Delete"
                        onClick={this.handleDeleteButtonClick}
                    />
                </div>
            </div>
        );
    }

    private readonly handleChangeItemDescription = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: evt.target.value,
        });
    };

    private readonly handleSaveButtonClick = () => {
        const { onChangeViewModelItem } = this.props;
        const { name, description } = this.state;

        onChangeViewModelItem({
            changeType: ChangeType.CHANGED,
            itemName: name,
            itemDescription: description,
        });
    };

    private readonly handleDeleteButtonClick = () => {
        const { onChangeViewModelItem } = this.props;
        const { name } = this.state;

        onChangeViewModelItem({ changeType: ChangeType.REMOVED, itemName: name });

        this.setState({
            name: undefined,
        });
    };

    private readonly handleCancelButtonClick = () => {
        this.setState({
            description: this.props.itemDescription,
        });
    };
}
