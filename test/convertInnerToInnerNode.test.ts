import {expect} from "chai";
import {NodeViewModel} from "../src/stories/inner-editor";

const inputTestInner: Inner = {
    "А1/Б1/С1": {
        "value": "0710099"
    },
    "А1/Б2/С2": {
        "value": ""
    },
    "А1/Б1/С3/Д1/Е1": {
        "children": []
    },
    "А1/Б1/С3/Д2/Ж1": {
        "error": ["Error Ж1"]
    },
}

const testSetOfPath = {
    headNode: "А1",
    setOfPath: [
        ["Б1", "С1"],
        ["Б2", "С2"],
        ["Б1", "С3", "Д1", "Е1"],
        ["Б1", "С3", "Д2", "Ж1"]
    ]
};


type Inner = { [path: string]: NodeViewModel }

interface InnerTree {
    head: string,
    children: InnerTree[]
}

interface FullInnerTree {
    name: string,
    children?: FullInnerTree[],
    viewModel?: NodeViewModel | null
}

type SetOfPath = string[][];

interface SplittingPath {
    headNode: string,
    setOfPath: SetOfPath
}

const getAllPath = (inputInner: Inner) => Object.keys(inputInner);

const getSplittingAllPath = (inputInner: Inner) => {
    const allPath = getAllPath(inputInner);

    const splittingAllPath = allPath.map((path) => path.split("/"));
    const headNode = [splittingAllPath[0][0]];
    const childSplittingPath = splittingAllPath.map(path => {
        path.shift();
        return path;
    })

    return [{
        headNode,
        childSplittingPath
    }];
};

const getViewModel = (path: string, inputInner: Inner) => {
    return inputInner[path] !== undefined ? inputInner[path] : null;
};

const createInnerNode = (nodeName: string, fullPath: string, childrenNode: FullInnerTree[] | null, inputInner: Inner) => {
    const innerNode = {
        name: nodeName,
    };

    if (childrenNode) {
        Object.assign(innerNode, {
            children: childrenNode
        })
    }

    if (getViewModel(fullPath, inputInner)) {
        Object.assign(innerNode, {
            viewModel: getViewModel(fullPath, inputInner)
        })
    }

    return innerNode;
};

const convertInnerToInnerNode = (splittingPath: SplittingPath, inputInner: Inner): FullInnerTree => {
    const {headNode, setOfPath} = splittingPath;

    const getSetOfPathForCurrentNode = (parentPath: string, currentSetOfPath: SetOfPath): FullInnerTree[] => {
        const allChildOfCurrentNode = currentSetOfPath.slice().map((path) => path[0]);
        const childOfCurrentNode = Array.from(new Set(allChildOfCurrentNode));

        const newNode: FullInnerTree[] = childOfCurrentNode.slice().map((child) => {
            const childElements = currentSetOfPath.slice()
                .filter((path) => path[0] === child)
                .map(path => {
                    path.shift();
                    return path;
                });

            const fullPath = parentPath.concat("/").concat(child);

            const childrenNode = childElements[0].length > 0 ? getSetOfPathForCurrentNode(fullPath, childElements) : null;

            return createInnerNode(child, fullPath, childrenNode, inputInner);
        });

        return newNode;
    };

    const childrenNode = setOfPath[0].length > 0 ? getSetOfPathForCurrentNode(headNode, setOfPath) : null;

    return createInnerNode(headNode, headNode, childrenNode, inputInner);
};


describe("Inner adapter", () => {
    it('Convert Inner To Inner Node', () => {
        expect(convertInnerToInnerNode(testSetOfPath, inputTestInner)).to.deep.equal(
            {
                name: "А1",
                children: [
                    {
                        name: "Б1",
                        children: [
                            {
                                name: "С1",
                                viewModel: {
                                    value: "0710099"
                                }
                            },
                            {
                                name: "С3",
                                children: [
                                    {
                                        name: "Д1",
                                        children: [
                                            {
                                                name: "Е1",
                                                viewModel: {
                                                    "children": []
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        name: "Д2",
                                        children: [
                                            {
                                                name: "Ж1",
                                                viewModel: {
                                                    "error": ["Error Ж1"]
                                                }
                                            }
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: "Б2",
                        children: [
                            {
                                name: "С2",
                                viewModel: {
                                    value: ""
                                }
                            },
                        ]
                    }
                ],
            }
        )
    });
});

describe("Create Inner Node", () => {
    it("CreateInnerNode", () => {
        expect(createInnerNode("С2", "А1/Б2/С2", null, inputTestInner)).to.deep.equal(
            {
                name: "С2",
                viewModel: {
                    "value": ""
                },
            })
    });
});

describe("Get View Model", () => {
    it("GetViewModel", () => {
        expect(getViewModel("А1/Б1/С3/Д2/Ж1", inputTestInner)).to.deep.equal({
            "error": ["Error Ж1"]
        })
    });
});

describe("Get all path", () => {
    it("GetAllPath", () => {
        expect(getAllPath(inputTestInner)).to.deep.equal(
            ["А1/Б1/С1", "А1/Б2/С2", "А1/Б1/С3/Д1/Е1", "А1/Б1/С3/Д2/Ж1"]
        )
    });
});

describe("Get splitting all path", () => {
    it("getSplittingAllPath", () => {
        expect(getSplittingAllPath(inputTestInner)).to.deep.equal([{
            headNode: ["А1"],
            childSplittingPath: [
                ["Б1", "С1"],
                ["Б2", "С2"],
                ["Б1", "С3", "Д1", "Е1"],
                ["Б1", "С3", "Д2", "Ж1"]
            ],
        }])
    });
});