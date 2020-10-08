import {expect} from "chai";
import {InnerNodeItem, NodeViewModel} from "../src/stories/inner-editor";

type Inner = { [path: string]: NodeViewModel }


interface FullInnerTree {
    name: string,
    children?: FullInnerTree[],
    viewModel?: NodeViewModel | null
}

type SetOfPath = string[][];

const getAllPath = (inputInner: Inner): string[] => Object.keys(inputInner);

const getViewModel = (path: string, inputInner: Inner): NodeViewModel | null => {
    return inputInner[path] !== undefined ? inputInner[path] : null;
};

const getSetOfSplittingPath = (inputInner: Inner): SetOfPath => {
    return getAllPath(inputInner).map((path) => path.split("/"));
};

const createShiftSplittingPath = (setOfSplittingPath: SetOfPath): SetOfPath => {
    return setOfSplittingPath.map(path => {
        path.shift();
        return path;
    });
}

const createInnerNode = (nodeName: string, fullPath: string, childrenNode: FullInnerTree[] | null, inputInner: Inner): InnerNodeItem => {
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

const findHeadNode = (setOfPath: SetOfPath) => {
    const headNodes = setOfPath.map(path => {
        return path[0]
    })

    const headNode = Array.from(new Set(headNodes))
    if (headNode.length > 1) {
        throw new Error("Too more head nodes");
    } else {
        return headNode[0];
    }
}

const convertInnerToInnerNode = (inputInner: Inner): FullInnerTree => {
    const setOfSplittingPath = getSetOfSplittingPath(inputInner);

    const headNode = findHeadNode(setOfSplittingPath);
    const setOfPath = createShiftSplittingPath(setOfSplittingPath);

    const getSetOfPathForCurrentNode = (parentPath: string, currentSetOfPath: SetOfPath): FullInnerTree[] => {
        const allChildOfCurrentNode = currentSetOfPath.slice().map((path) => path[0]);
        const childOfCurrentNode = Array.from(new Set(allChildOfCurrentNode));

        const newNode: FullInnerTree[] = childOfCurrentNode.slice().map((child) => {
            const childElements = createShiftSplittingPath(currentSetOfPath.slice()
                .filter((path) => path[0] === child));

            const fullPath = parentPath.concat("/").concat(child);

            const childrenNode = childElements[0].length > 0 ? getSetOfPathForCurrentNode(fullPath, childElements) : null;

            return createInnerNode(child, fullPath, childrenNode, inputInner);
        });

        return newNode;
    };

    const childrenNode = setOfPath[0].length > 0 ? getSetOfPathForCurrentNode(headNode, setOfPath) : null;

    return createInnerNode(headNode, headNode, childrenNode, inputInner);

};


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

const inputTestInnerWithTwoHeadNodes: Inner = {
    "А1/Б1/С1": {
        "value": "0710099"
    },
    "А2/Б2/С2": {
        "value": ""
    },
    "А1/Б1/С3/Д1/Е1": {
        "children": []
    },
    "А1/Б1/С3/Д2/Ж1": {
        "error": ["Error Ж1"]
    },
}

const testInnerWithMultiple: Inner = {
    "А1/Б1/С1": {
        "value": "0710099"
    },
    "А1/Б2/0/С2": {
        "value": ""
    },
    "А1/Б2/1/С2": {
        "error": ["Error Ж1"]
    },
}

const testSetOfSplittingPath: SetOfPath = [
    ["Б1", "С1"],
    ["Б1", "С3", "Д1", "Е1"],
    ["Б1", "С3", "Д2", "Ж1"]
];

const testSetOfSplittingPathWithTwoHeadNodes: SetOfPath = [
    ["Б2", "С1"],
    ["Б1", "С3", "Д1", "Е1"],
    ["Б1", "С3", "Д2", "Ж1"]
];

describe("Find Head Node", () => {
    it("FindHeadNode", () => {
        expect(findHeadNode(testSetOfSplittingPath)).to.equal("Б1")
    });
    it("Throw error if there are two head nodes", () => {
        expect(findHeadNode(testSetOfSplittingPathWithTwoHeadNodes)).to.throw();
    });
})
describe("Inner adapter", () => {
    it("Throw error if there are two head nodes", () => {
        expect(convertInnerToInnerNode(inputTestInnerWithTwoHeadNodes)).to.throw();
    })
    it('Convert Inner To Inner Node', () => {
        expect(convertInnerToInnerNode(inputTestInner)).to.deep.equal(
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
    it('Convert Inner To Inner Node With Multiple', () => {
        expect(convertInnerToInnerNode(testInnerWithMultiple)).to.deep.equal(
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
                    }
                ]
            },
            {
                name: "Б2",
                children: [
                    {
                        name: "0/С2",
                        viewModel: {
                            value: ""
                        }
                    },
                    {
                        name: "1/С2",
                        viewModel: {
                            error: ["Error Ж1"]
                        }
                    },
                ]
            }
        ],
        })
    })
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

describe("Get set of splitting path", () => {
    it("getSetOfSplittingPath", () => {
        expect(getSetOfSplittingPath(inputTestInner)).to.deep.equal([
            ["А1", "Б1", "С1"],
            ["А1", "Б2", "С2"],
            ["А1", "Б1", "С3", "Д1", "Е1"],
            ["А1", "Б1", "С3", "Д2", "Ж1"]
        ])
    });
    it("getSetOfSplittingPathMultiple", () => {
        expect(getSetOfSplittingPath(testInnerWithMultiple)).to.deep.equal([
            ["А1", "Б1", "С1"],
            ["А1", "Б2", "0/С2"],
            ["А1", "Б2", "1/С2"],
        ])
    });
});

describe("Get Shift Splitting Path", () => {
    it('GetShiftSplittingPath', () => {
        expect(createShiftSplittingPath(testSetOfSplittingPath)).to.deep.equal(
            [
                ["С1"],
                ["С3", "Д1", "Е1"],
                ["С3", "Д2", "Ж1"]
            ]
        )
    });
});