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
    edited: boolean;
    name: string | undefined;
    description: PropertyDescription;
}

export class NodeViewModelItem extends React.PureComponent<NodeViewModelItemProps, NodeViewModelItemState> {
    public state = {
        edited: false,
        name: this.props.itemName,
        description: this.props.itemDescription,
    };

    public render(): JSX.Element {
        const { edited, name, description } = this.state;

        let item;
        if (name) {
            item = (
                <>
                    <span className={styles.propertyName}>{name}: </span>;
                    {edited ? (
                        <div>
                            <input
                                className={styles.propertyValue}
                                value={description}
                                onChange={this.handleChangeItemDescription}
                            />
                            <input type="button" value="V" onClick={this.handleSaveButtonClick} />
                            <input type="button" value="↶" onClick={this.handleCancelButtonClick} />
                            <input type="button" value="X" onClick={this.handleDeleteButtonClick} />
                        </div>
                    ) : (
                        <div>
                            <input className={styles.propertyValue} value={description} disabled={true} />
                            <input type="button" value="✏" onClick={this.handleEditButtonClick} />
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
            edited: !this.state.edited,
        });
    };

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

        this.setState({
            edited: !this.state.edited,
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
            edited: !this.state.edited,
            description: this.props.itemDescription,
        });
    };
}
