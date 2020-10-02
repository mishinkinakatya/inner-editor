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

interface NodeViewModelProps {
    nodeViewModel: NodeViewModel;
}

const NodeViewModel = (props: NodeViewModelProps): JSX.Element => {
    const {nodeViewModel} = props;
    return (
        <div className="view-model">
            {
                nodeViewModel.value ?
                    <div className="view-model-item">
                        <span>value: </span>
                        <label>{nodeViewModel.value}</label>
                    </div>
                    : ``
            }
            {
                nodeViewModel.error ?
                    <div className="view-model-item">
                        <span>error: </span>
                        <label>{nodeViewModel.error}</label>
                    </div>
                    : ``
            }
            {
                nodeViewModel.children ?
                    <div className="view-model-item">
                        <span>children: </span>
                        <label>{nodeViewModel.children}</label>
                    </div>
                    : ``
            }
        </div>
    );
};

interface InnerNodeProps {
    inner: InnerNode;
    isChildrenShow: boolean;
    onShowChildrenButtonClick: () => void;
}

const InnerNode = (props: InnerNodeProps): JSX.Element => {
    const {inner, isChildrenShow, onShowChildrenButtonClick} = props;

    return (
        <div className="inner-tree" key={inner.name}>
            <div className="inner-node">
                <input className="node-name" type="button" value={isChildrenShow ? "-" : "+"} onClick={onShowChildrenButtonClick}/>
                <input className="node-name" value={inner.name} readOnly={true}/>
                <NodeViewModel nodeViewModel={inner.viewModel}/>
            </div>
            {isChildrenShow
                ? inner.children.map((child) => <InnerNode key={child.name} inner={child} isChildrenShow={false} onShowChildrenButtonClick={onShowChildrenButtonClick}/>)
                : ``
            }
        </div>
    )
};

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
                <InnerNode key={inner.name} inner={inner} isChildrenShow={isChildrenShow} onShowChildrenButtonClick={this._showChildren}/>
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

export const InnerNodeWithChildrenComponent = (): JSX.Element => <InnerNode inner={testInner} isChildrenShow={true} onShowChildrenButtonClick={action("onShowChildrenButtonClick")}/>;

export const InnerNodeWithoutChildrenComponent = (): JSX.Element => <InnerNode inner={testInner} isChildrenShow={false} onShowChildrenButtonClick={action("onShowChildrenButtonClick")}/>;
