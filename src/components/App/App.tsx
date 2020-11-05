import * as React from "react";
import { InnerNodeItem, PropertyDescription } from "../../domain/Inner";
import styles from "./App.css";
import { convertInnerToInnerNode, Path } from "../../domain/ConverInnerToInnerNode";
import { ChangeType, createChangeSet, NodeChanges } from "../../domain/CreateChangeSet";
import { Api } from "../../api/Api";
import { ICandyApi } from "../../api/ICandyApi";
import { InnerTree } from "../InnerTree/InnerTree";

interface AppProps {
    match: { params: { ns: string; drafts: string } };
}

interface AppState {
    api: ICandyApi;
    rootNode: InnerNodeItem | undefined;
    disabled: boolean;
}
interface InnerChanges {
    inner: InnerNodeItem;
    nodeNames: Path;
    changeType: string;
    itemName: string;
    itemDescription?: PropertyDescription;
}

export class App extends React.PureComponent<AppProps, AppState> {
    public state = {
        api: new Api(),
        rootNode: undefined,
        disabled: false,
    };

    componentDidMount() {
        this.getInner();
    }

    public render(): JSX.Element {
        const { rootNode, disabled } = this.state;

        return (
            <div className={styles.innerEditor}>
                <h1>Inner Editor</h1>
                {rootNode ? (
                    <fieldset className={styles.inner} disabled={disabled}>
                        <InnerTree rootNode={rootNode} onChangeInnerTree={this.changeInnerTree} />
                    </fieldset>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        );
    }

    private readonly getInner = () => {
        const { api } = this.state;
        const { match } = this.props;

        async function getInner() {
            const result = await api.getInner({ ns: match.params.ns, drafts: match.params.drafts });
            return convertInnerToInnerNode(result);
        }

        (async () => {
            try {
                const result = await getInner();
                this.changeRootNode(result);
            } catch (err) {
                console.error(err);
            }
        })();
    };

    private readonly changeInnerTree = ({ nodeNames, changeType, itemName, itemDescription }: NodeChanges) => {
        const { rootNode, api } = this.state;
        const { match } = this.props;

        const changeAppState = () => {
            this.changeRootNode(
                this.updateRootNode({
                    inner: rootNode,
                    nodeNames: nodeNames,
                    changeType: changeType,
                    itemName: itemName,
                    itemDescription: itemDescription,
                }),
            );
            this.changeDisabledState(false);
        };

        (async () => {
            try {
                this.changeDisabledState(true);
                await api.changeInnerNode(
                    createChangeSet({
                        nodeNames: nodeNames,
                        changeType: changeType,
                        itemName: itemName,
                        itemDescription: itemDescription,
                    }),
                    { ns: match.params.ns, drafts: match.params.drafts },
                );
                changeAppState();
            } catch (err) {
                console.error(err);
            }
        })();
    };

    private updateRootNode = ({
        inner,
        nodeNames,
        changeType,
        itemName,
        itemDescription,
    }: InnerChanges): InnerNodeItem => {
        let updatedNode = inner;
        let nodeNumber = 1;

        while (nodeNumber < nodeNames.length) {
            const newNode = updatedNode.children.find(x => x.name === nodeNames[nodeNumber]);
            updatedNode = newNode ? newNode : updatedNode;
            nodeNumber++;
        }
        if (updatedNode.viewModel) {
            if (changeType === ChangeType.CHANGED && itemDescription) {
                updatedNode.viewModel[itemName] = itemDescription;
            } else if (changeType === ChangeType.REMOVED) {
                delete updatedNode.viewModel[itemName];
            }
        }

        return inner;
    };

    private changeRootNode(inner: InnerNodeItem) {
        this.setState({
            rootNode: inner,
        });
    }

    private changeDisabledState(isDisabled: boolean) {
        this.setState({
            disabled: isDisabled,
        });
    }
}
