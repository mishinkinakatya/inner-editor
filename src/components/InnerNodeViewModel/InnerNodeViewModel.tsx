import * as React from "react";
import { NodeViewModelItem, ViewModelChanges } from "../NodeViewModelItem/NodeViewModelItem";
import { NodeViewModel } from "../../domain/Inner";
import styles from "./InnerNodeViewModel.css";

interface InnerNodeViewModelProps {
    nodeViewModel: NodeViewModel;
    visibility: boolean;
    onChangeViewModel({ changeType, itemName, itemDescription }: ViewModelChanges): void;
}

export class InnerNodeViewModel extends React.PureComponent<InnerNodeViewModelProps> {
    public render(): JSX.Element {
        const { nodeViewModel, visibility } = this.props;

        return (
            <div className={styles.viewModel}>
                {visibility
                    ? Object.keys(nodeViewModel).map(item => (
                          <NodeViewModelItem
                              key={item}
                              itemName={item}
                              itemDescription={nodeViewModel[item]}
                              onChangeViewModelItem={this.handleChangeViewModelItem}
                          />
                      ))
                    : Object.hasOwnProperty.call(nodeViewModel, "value") && (
                          <NodeViewModelItem
                              itemName="value"
                              itemDescription={nodeViewModel["value"]}
                              onChangeViewModelItem={this.handleChangeViewModelItem}
                          />
                      )}
            </div>
        );
    }

    private readonly handleChangeViewModelItem = ({ changeType, itemName, itemDescription }: ViewModelChanges) => {
        const { onChangeViewModel } = this.props;
        onChangeViewModel({
            changeType: changeType,
            itemName: itemName,
            itemDescription: itemDescription,
        });
    };
}
