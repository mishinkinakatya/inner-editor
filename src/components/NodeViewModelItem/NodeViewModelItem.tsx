import * as React from "react";
import styles from "./NodeViewModelItem.css";
import { PropertyDescription } from "../../domain/Inner";
import { ChangeType } from "../../domain/CreateChangeSet";
import { Input } from "@skbkontur/react-ui/components/Input/Input";
import { Delete, Hyphen, Ok, Undo } from "@skbkontur/react-icons";
import { Button } from "@skbkontur/react-ui/components/Button/Button";

export interface ViewModelChanges {
    changeType: string;
    itemName: string;
    itemDescription?: PropertyDescription;
}

interface NodeViewModelItemProps {
    itemName: string;
    itemDescription: string;
    onChangeViewModelItem({ changeType, itemName, itemDescription }: ViewModelChanges): void;
}

interface NodeViewModelItemState {
    name: string | undefined;
    description: string;
    showingButtons: boolean;
    hovered: boolean;
}

export class NodeViewModelItem extends React.PureComponent<NodeViewModelItemProps, NodeViewModelItemState> {
    public state = {
        name: this.props.itemName,
        description: this.props.itemDescription,
        showingButtons: false,
        hovered: false,
    };

    public render(): JSX.Element | "" {
        const { name, description, showingButtons, hovered } = this.state;

        return name ? (
            <div
                className={styles.viewModelItem}
                onMouseEnter={this.handleHoverProp}
                onMouseLeave={this.handleHoverProp}
            >
                <div className={styles.hyphen}>
                    <Hyphen />
                </div>
                <div className={styles.itemName}>{name} :</div>
                <div className={styles.itemDescription}>
                    <Input
                        borderless={!hovered}
                        className={styles.propertyValue}
                        value={description}
                        onChange={this.handleChangeItemDescription}
                    />
                </div>
                {hovered && <div className={styles.actionButtons}>{this.renderActionButtons(showingButtons)}</div>}
            </div>
        ) : (
            ""
        );
    }

    private renderActionButtons(showingButtons: boolean): JSX.Element {
        return (
            <div className={styles.actionButtons}>
                {!showingButtons && (
                    <div className={styles.actionButton}>
                        <Button
                            use={"link"}
                            onClick={this.handleDeleteButtonClick}
                            icon={<Delete color={"#000000"} size={14} />}
                        />
                    </div>
                )}
                {showingButtons && (
                    <>
                        <div className={styles.actionButton}>
                            <Button
                                use={"link"}
                                onClick={this.handleSaveButtonClick}
                                icon={<Ok color={"#000000"} size={14} />}
                            />
                        </div>
                        <div className={styles.actionButton}>
                            <Button
                                use={"link"}
                                onClick={this.handleCancelButtonClick}
                                icon={<Undo color={"#000000"} size={14} />}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    }

    private readonly handleHoverProp = (): void => {
        this.setState({
            hovered: !this.state.hovered,
        });
    };

    private readonly handleChangeShowingButtons = (): void => {
        this.setState({
            showingButtons: !this.state.showingButtons,
        });
    };

    private readonly handleChangeItemDescription = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            description: evt.target.value,
            showingButtons: true,
        });
    };

    private readonly handleSaveButtonClick = (): void => {
        const { onChangeViewModelItem } = this.props;
        const { name, description } = this.state;

        onChangeViewModelItem({
            changeType: ChangeType.CHANGED,
            itemName: name,
            itemDescription: name === "children" || name === "error" ? description.toString().split(",") : description,
        });
        this.handleChangeShowingButtons();
    };

    private readonly handleDeleteButtonClick = (): void => {
        const { onChangeViewModelItem } = this.props;
        const { name } = this.state;

        const deleteProp = () => {
            onChangeViewModelItem({ changeType: ChangeType.REMOVED, itemName: name });

            this.setState({
                name: undefined,
            });
        };

        confirm("Вы действительно хотите удалить свойство?") ? deleteProp() : this.handleCancelButtonClick;
    };

    private readonly handleCancelButtonClick = (): void => {
        this.setState({
            description: this.props.itemDescription,
        });
        this.handleChangeShowingButtons();
    };
}
