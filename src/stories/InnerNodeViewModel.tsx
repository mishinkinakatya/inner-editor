import * as React from "react";
import {InnerNodeViewModelItem} from "./InnerNodeViewModelItem";
import {NodeViewModel} from "./inner-editor";


export interface InnerNodeViewModelProps {
    nodeViewModel: NodeViewModel;
}

export const InnerNodeViewModel: React.FC<InnerNodeViewModelProps> = (props): JSX.Element => {
    const {nodeViewModel} = props;
    const viewModelItems = Object.keys(nodeViewModel);

    return (
        <div className="view-model">
            {viewModelItems.map((item) => {

                return (
                    <InnerNodeViewModelItem key={item} itemName={item} itemDescription={nodeViewModel[item]}/>
                )
            })}
        </div>
    )
}
