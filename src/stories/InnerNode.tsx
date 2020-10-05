import * as React from "react";
import {NodeViewModel, NodeViewModelItem} from "./InnerViewModel";

export interface InnerNode {
    name: string;
    children: InnerNode[];
    viewModel: NodeViewModel;
}

export interface InnerNodeProps {
    inner: InnerNode;
}

export interface InnerNodeState {
    isChildrenShow: boolean;
    isPropertiesShow: boolean;
}

export class InnerNodeItem extends React.PureComponent<InnerNodeProps, InnerNodeState> {
    constructor(props: InnerNodeProps) {
        super(props);

        this.state = {
            isChildrenShow: false,
            isPropertiesShow: false
        }
    }

    render() {
        const {inner} = this.props;
        const {isChildrenShow, isPropertiesShow} = this.state;

        return (
            <div className="inner-tree" key={inner.name}>
                <div className="inner-node">
                    <input className="node-name" type="button" value={isChildrenShow ? "▽" : "▷"}
                           onClick={this._handleShowChildren}/>
                    <input className="node-name" value={inner.name} readOnly={true}/>
                    {isPropertiesShow
                        ? <div className="view-model">
                            {this._renderViewModel(inner.viewModel)}
                        </div>
                        : <div className="view-model">
                            <input type="button" value="👁‍" onClick={this._handleShowProperties}/>
                        </div>
                    }
                </div>
                {isChildrenShow
                    ? inner.children.map((child) => <InnerNodeItem key={child.name} inner={child}/>)
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
                    <NodeViewModelItem itemName={item} itemDescription={viewModel[item]}/>
                )
            })
        )
    }

    _handleShowChildren = () => {
        this.setState({
            isChildrenShow: !this.state.isChildrenShow
        })
    }

    _handleShowProperties = () => {
        this.setState({
            isPropertiesShow: !this.state.isPropertiesShow
        })
    }
}
