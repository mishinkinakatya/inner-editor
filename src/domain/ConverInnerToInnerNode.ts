import { Inner, InnerNodeItem, NodeViewModel } from "./Inner";

type Path = string[];

export type Paths = Path[];

export function convertInnerToInnerNode(inputInner: Inner): InnerNodeItem {
    const setOfSplittingPaths = Object.keys(inputInner).map(x => x.split("/"));

    const getInnerNodes = (parentPath: string | undefined, currentSetOfPaths: Paths): InnerNodeItem[] => {
        const namesOfChildOfCurrentNode = Array.from(new Set(currentSetOfPaths.slice().map(x => x[0])));

        const childNodes: InnerNodeItem[] = namesOfChildOfCurrentNode.slice().map(childNode => {
            const childNodesOfCurrentChild = currentSetOfPaths
                .filter(x => x[0] === childNode)
                .map(path => {
                    const [prefix, ...restPath] = path;
                    return restPath;
                })
                .filter(x => x.length > 0);

            const fullPath = parentPath ? parentPath.concat("/").concat(childNode) : "/".concat(childNode);
            const viewModel =
                inputInner[fullPath.substring(1)] != undefined ? inputInner[fullPath.substring(1)] : undefined;

            return createInnerNode(childNode, getInnerNodes(fullPath, childNodesOfCurrentChild), viewModel);
        });

        return childNodes;
    };

    const innerNode = getInnerNodes(undefined, setOfSplittingPaths);

    if (innerNode.length > 1) {
        throw new Error("Too more head nodes");
    } else {
        return innerNode[0];
    }
}

export function createInnerNode(
    name: string,
    children: InnerNodeItem[] | undefined,
    viewModel: NodeViewModel | undefined,
): InnerNodeItem {
    const innerNode: InnerNodeItem = {
        name,
    };

    if (children && children.length > 0) {
        innerNode.children = children;
    }

    if (viewModel) {
        innerNode.viewModel = viewModel;
    }

    return innerNode;
}
