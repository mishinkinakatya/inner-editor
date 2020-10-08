import * as React from "react";
import {NodeViewModelMode} from "./inner-editor";


export interface InnerNodeViewModelItemProps {
    itemName: string;
    itemDescription: string | string[]
}

export interface InnerNodeViewModelItemState {
    currentMode: NodeViewModelMode,
    currentDescription: string | string[]
}

export class InnerNodeViewModelItem extends React.PureComponent<InnerNodeViewModelItemProps, InnerNodeViewModelItemState> {
    constructor(props: InnerNodeViewModelItemProps) {
        super(props);

        this.state = {
            currentMode: NodeViewModelMode.Read,
            currentDescription: this.props.itemDescription
        }
    }

    render() {
        const {itemName, itemDescription} = this.props;
        const {currentMode, currentDescription} = this.state;

        return (
            <div className="view-model-item">
                <span>{itemName}: </span>
                {currentMode === NodeViewModelMode.Read
                    ? <label onDoubleClick={this._handleDoubleClickOnViewModelItemDescription}>{itemDescription}</label>
                    : <div>
                        <input value={currentDescription} onChange={this._handleChangeViewModelItemDescription}/>
                        <input type="button" value="V" onClick={this._handleSaveButtonClick}/>
                        <input type="button" value="↶" onClick={this._handleCancelButtonClick}/>
                        <input type="button" value="X"/>
                    </div>

                }
            </div>
        );
    }

    _handleDoubleClickOnViewModelItemDescription = () => {
        this.setState({
            currentMode: NodeViewModelMode.Edit
        })
    }

    _handleChangeViewModelItemDescription = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentDescription: evt.target.value
        })
    }

    _handleSaveButtonClick = () => {
        const newDescription = this.state.currentDescription;

        if (newDescription != undefined) {
            this.setState({
                currentMode: NodeViewModelMode.Read,
                currentDescription: newDescription
            });
        }
    }

    _handleCancelButtonClick = () => {
        this.setState({
            currentMode: NodeViewModelMode.Read,
            currentDescription: this.props.itemDescription
        });
    }
}
