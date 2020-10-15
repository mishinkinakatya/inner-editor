import { Inner, InnerNodeItem } from "./Inner";

type PathSegment = string;

type Path = PathSegment[];

export type Paths = Path[];

function getFirstSegment(x: PathSegment[]) {
    return x[0];
}

function skipFirstSegment(path: PathSegment[]) {
    const [prefix, ...restPath] = path;
    return restPath;
}

function isEmptyPath(x: PathSegment[]) {
    return x.length === 0;
}

export function convertInnerToInnerNode(inputInner: Inner): InnerNodeItem {
    const getInnerNodes = (parentPath: Path, childPaths: Paths): InnerNodeItem[] => {
        const grouped = groupBy(childPaths, x => getFirstSegment(x));
        return [...grouped.entries()].map(([segment, paths]) => {
            const fullPath = [...parentPath, segment];

            return {
                name: segment,
                children: getInnerNodes(
                    fullPath,
                    paths.map(skipFirstSegment).filter(x => !isEmptyPath(x)),
                ),
                viewModel: inputInner[fullPath.join("/")] || [],
            };
        });
    };

    const allPaths = Object.keys(inputInner).map(x => x.split("/"));

    const innerNode = getInnerNodes([], allPaths);

    if (innerNode.length > 1) {
        throw new Error("Too more head nodes");
    } else {
        return innerNode[0];
    }
}

function groupBy<T>(items: T[], selector: (item: T) => string): Map<string, T[]> {
    const result = new Map<string, T[]>();
    for (const item of items) {
        const groupKey = selector(item);
        if (result.has(groupKey)) {
            result.get(groupKey)?.push(item);
        } else {
            result.set(groupKey, []);
            result.get(groupKey)?.push(item);
        }
    }

    return result;
}
