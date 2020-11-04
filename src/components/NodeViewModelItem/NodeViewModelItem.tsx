import * as React from "react";
import styles from "./NodeViewModelItem.css";
import { PropertyDescription } from "../../domain/Inner";
import { ChangeType } from "../../domain/CreateChangeSet";
import { Input } from "@skbkontur/react-ui/components/Input/Input";
import { Hyphen } from "@skbkontur/react-icons";
import { Button } from "@skbkontur/react-ui/components/Button/Button";

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
    showingButtons: boolean;
}

export class NodeViewModelItem extends React.PureComponent<NodeViewModelItemProps, NodeViewModelItemState> {
    public state = {
        name: this.props.itemName,
        description: this.props.itemDescription,
        showingButtons: false,
    };

    public render(): JSX.Element | `` {
        const { name, description, showingButtons } = this.state;

        return name ? (
            <div className={styles.viewModelItem}>
                <div className={styles.property}>
                    <div className={styles.propertyName}>
                        <Hyphen />
                        <span> {name}</span>
                    </div>
                    <Input
                        className={styles.propertyValue}
                        value={description}
                        onChange={this.handleChangeItemDescription}
                        onFocus={this.handleChangeShowingButtons}
                    />
                </div>

                {showingButtons && this.renderActionButtons()}
            </div>
        ) : ``;
    }

    private renderActionButtons() {
        return (
            <div className={styles.actionButtons}>
                <Button onClick={this.handleSaveButtonClick}>Save</Button>
                <Button onClick={this.handleCancelButtonClick}>Cancel</Button>
                <Button onClick={this.handleDeleteButtonClick}>Delete</Button>
            </div>
        );
    }

    private readonly handleChangeShowingButtons = () => {
        this.setState({
            showingButtons: !this.state.showingButtons,
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
            itemDescription: name === "children" || name === "error" ? description.toString().split(",") : description,
        });
        this.handleChangeShowingButtons();
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
        this.handleChangeShowingButtons();
    };
}
