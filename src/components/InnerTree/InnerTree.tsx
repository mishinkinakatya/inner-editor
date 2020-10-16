import * as React from "react";
import { InnerNode } from "../InnerNode/InnerNode";
import { InnerNodeItem } from "../../domain/Inner";
import styles from "./InnerTree.css";
import { ApiModel } from "../../Api";
import { convertInnerToInnerNode } from "../../domain/ConverInnerToInnerNode";

interface InnerTreeProps {
    api: ApiModel;
}

interface InnerTreeState {
    currentInner: InnerNodeItem | undefined;
}

export class InnerTree extends React.PureComponent<InnerTreeProps> {
    public state: InnerTreeState = {
        currentInner: undefined,
    };

    componentDidMount() {
        this.getInner();
    }

    public render() {
        const { api } = this.props;
        const { currentInner } = this.state;

        return (
            <>
                <h1>Inner Editor</h1>
                {currentInner ? (
                    <div className={styles.innerTree}>
                        <InnerNode
                            api={api}
                            key={currentInner.name}
                            inner={currentInner}
                            onChangeInner={this.handleChangeInner}
                        />
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )}
            </>
        );
    }

    private readonly handleChangeInner = () => {
        this.getInner();
    };

    private readonly getInner = () => {
        const { api } = this.props;

        const changeState = (inner: InnerNodeItem) => {
            this.setState({
                currentInner: inner,
            });
        };

        async function getInner() {
            let result = await api.getInner();
            return convertInnerToInnerNode(result);
        }

        (async function () {
            try {
                let result = await getInner();
                changeState(result);
            } catch (err) {
                console.error(err);
            }
        })();
    };
}
