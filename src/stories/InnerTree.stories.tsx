import * as React from 'react';
import './inner-tree.css';

import {Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";

export default {title: 'Inner Editor/InnerTree'} as Meta;


interface NodeViewModel {
    value?: string;
    error?: string[];
    children?: string[];
}

interface InnerNode {
    name: string;
    children: InnerNode[];
    viewModel: NodeViewModel;
}

interface InnerNodeViewModel {
    children?: string[];
    value?: string;
    error?: string[];
}

type Inner = { [path: string]: InnerNodeViewModel }

function convertInnerToInnerNode(inner: Inner): NodeViewModel {
    return;
}

enum NodeViewModelMode {
    Read,
    Edit
}

interface NodeViewModelProps {
    itemName: string;
    itemDescription: string | []
}

interface NodeViewModelState {
    currentMode: NodeViewModelMode,
    currentDescription: string | string[]
}

class NodeViewModel extends React.PureComponent<NodeViewModelProps, NodeViewModelState> {
    constructor(props: NodeViewModelProps) {
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
                    : <input value={currentDescription} onChange={this._handleChangeViewModelItemDescription}
                             onKeyDown={this._handleKeyDownViewModelItemDescription}/>
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

    _handleKeyDownViewModelItemDescription = (evt: React.KeyboardEvent) => {
        const {itemDescription} = this.props;

        const isEnterKey: boolean = evt.key === `Enter`;
        const isEscKey: boolean = evt.key === `Esc` || evt.key === `Escape`;

        let newDescription;
        if (isEscKey) {
            newDescription = itemDescription;
        }
        if (isEnterKey) {
            newDescription = this.state.currentDescription
        }

        if (newDescription != undefined) {
            this.setState({
                currentMode: NodeViewModelMode.Read,
                currentDescription: newDescription
            });
        }
    }

}

interface InnerNodeProps {
    inner: InnerNode;
    isChildrenShow: boolean;
    onShowChildrenButtonClick: () => void;
}

class InnerNode extends React.PureComponent<InnerNodeProps> {
    constructor(props: InnerNodeProps) {
        super(props);
    }

    render() {
        const {inner, isChildrenShow, onShowChildrenButtonClick} = this.props;

        return (
            <div className="inner-tree" key={inner.name}>
                <div className="inner-node">
                    <input className="node-name" type="button" value={isChildrenShow ? "-" : "+"}
                           onClick={onShowChildrenButtonClick}/>
                    <input className="node-name" value={inner.name} readOnly={true}/>
                    <div className="view-model">
                        {this._renderViewModel(inner.viewModel)}
                    </div>
                </div>
                {isChildrenShow
                    ? inner.children.map((child) => <InnerNode key={child.name} inner={child} isChildrenShow={false}
                                                               onShowChildrenButtonClick={onShowChildrenButtonClick}/>)
                    : ``
                }
            </div>
        )
    }

    _renderViewModel = (viewModel: NodeViewModel) => {
        const viewModelItems = Object.keys(viewModel);
        return (
            viewModelItems.map((item) => {
                return (
                    <NodeViewModel itemName={item} itemDescription={viewModel[item]}/>
                )
            })
        )
    }
}


interface InnerTreeProps {
    inner: InnerNode;
}

interface InnerTreeState {
    isChildrenShow: boolean;
}

class InnerTree extends React.PureComponent<InnerTreeProps, InnerTreeState> {

    constructor(props: InnerTreeProps) {
        super(props);

        this.state = {
            isChildrenShow: false,
        }
    }

    render() {
        const {inner} = this.props;
        const {isChildrenShow} = this.state;

        return (
            <div className="inner-tree">
                <InnerNode key={inner.name} inner={inner} isChildrenShow={isChildrenShow}
                           onShowChildrenButtonClick={this._showChildren}/>
            </div>
        )
    }

    _showChildren = () => {

        this.setState({
            isChildrenShow: !this.state.isChildrenShow
        })
    }
}


const testInner: InnerNode = {
    name: "First",
    viewModel: {
        value: "FirstValue",
        error: ["FirstError"],
    },
    children: [{
        name: "Second",
        viewModel: {
            error: ["SecondError"],
        },
        children: [{
            name: "Fourth",
            viewModel: {
                error: ["FourthError"],
            },
            children: []
        }]
    }, {
        name: "Third",
        viewModel: {
            children: ["NullChild", "FirstChild"],
        },
        children: []
    }
    ]
}

export const InnerTreeComponent = (): JSX.Element => <InnerTree inner={testInner}/>;

export const InnerNodeWithChildrenComponent = (): JSX.Element => <InnerNode inner={testInner} isChildrenShow={true}
                                                                            onShowChildrenButtonClick={action("onShowChildrenButtonClick")}/>;

export const InnerNodeWithoutChildrenComponent = (): JSX.Element => <InnerNode inner={testInner} isChildrenShow={false}
                                                                               onShowChildrenButtonClick={action("onShowChildrenButtonClick")}/>;

export const NodeViewModelComponent = (): JSX.Element => <NodeViewModel itemName="itemName" itemDescription="ItemDescription"/>;
