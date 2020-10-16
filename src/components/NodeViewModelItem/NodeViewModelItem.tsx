import * as React from "react";
import styles from "./NodeViewModelItem.css";
import { ApiModel } from "../../Api";
import { InnerNodeItem, PropertyDescription } from "../../domain/Inner";

enum NodeViewModelMode {
    Read,
    Edit,
}

interface NodeViewModelItemProps {
    itemName: string;
    itemDescription: PropertyDescription;
    fullPath: string;
    api: ApiModel;
    onChangeInner: () => void;
}

interface NodeViewModelItemState {
    currentMode: NodeViewModelMode;
    currentDescription: PropertyDescription;
}

export class NodeViewModelItem extends React.PureComponent<NodeViewModelItemProps, NodeViewModelItemState> {
    public state = {
        currentMode: NodeViewModelMode.Read,
        currentDescription: this.props.itemDescription,
    };

    public render() {
        const { itemName } = this.props;
        const { currentMode, currentDescription } = this.state;

        return (
            <div className={styles.viewModelItem}>
                <span className={styles.propertyName}>{itemName}: </span>
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
        const { fullPath, itemName, api, onChangeInner } = this.props;
        const { currentDescription } = this.state;

        const changeState = () => {
            this.setState({
                currentMode: NodeViewModelMode.Read,
                currentDescription,
            });
        };

        async function changeInner() {
            await api.changeInnerNode({
                added: [],
                changed: {
                    [fullPath.concat(".").concat(itemName)]: currentDescription,
                },
                removed: [],
            });
        }

        if (currentDescription != undefined) {
            (async function () {
                try {
                    await changeInner();
                    await onChangeInner();
                    changeState();
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    };

    private readonly handleCancelButtonClick = () => {
        this.setState({
            currentMode: NodeViewModelMode.Read,
            currentDescription: this.props.itemDescription,
        });
    };
}
