import * as React from "react";
import {InnerNodeViewModel} from "./InnerNodeViewModel";
import {InnerNodeItem} from "./inner-editor";


export interface InnerNodeItemProps {
    inner: InnerNodeItem;
}

export interface InnerNodeItemState {
    isChildrenShow: boolean;
    isPropertiesShow: boolean;
}

export class InnerNode extends React.PureComponent<InnerNodeItemProps, InnerNodeItemState> {
    constructor(props: InnerNodeItemProps) {
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
                    <input className="node-name" type="button"
                           value={isChildrenShow || (inner.children && inner.children.length === 0) ? "▽" : "▷"}
                           onClick={this._handleShowChildren}/>
                    <input className="node-name" value={inner.name} readOnly={true}/>
                    {isPropertiesShow
                        ? <InnerNodeViewModel nodeViewModel={inner.viewModel}/>
                        : <div className="view-model">
                            <input type="button" value="👁‍" onClick={this._handleShowProperties}/>
                        </div>
                    }
                </div>
                {isChildrenShow && inner.children
                    ? inner.children.map((child) => <InnerNode key={child.name} inner={child}/>)
                    : ``
                }
            </div>
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
