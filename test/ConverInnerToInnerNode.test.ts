import { expect } from "chai";
import { Inner } from "../src/domain/Inner";
import { convertInnerToInnerNode } from "../src/domain/ConverInnerToInnerNode";

const inputTestInner: Inner = {
    "А1/Б1/С1": {
        value: "0710099",
    },
    "А1/Б2/С2": {
        value: "",
    },
    "А1/Б1/С3/Д1/Е1": {
        children: [],
    },
    "А1/Б1/С3/Д2/Ж1": {
        error: ["Error Ж1"],
    },
};

const inputTestInnerWithTwoHeadNodes: Inner = {
    "А1/Б1/С1": {
        value: "0710099",
    },
    "А2/Б2/С2": {
        value: "",
    },
    "А1/Б1/С3/Д1/Е1": {
        children: [],
    },
    "А1/Б1/С3/Д2/Ж1": {
        error: ["Error Ж1"],
    },
};

const testInnerWithMultiple: Inner = {
    "А1/Б1/С1": {
        value: "0710099",
    },
    "А1/Б1/0/С2": {
        value: "",
    },
    "А1/Б1/1/С2": {
        error: ["Error Ж1"],
    },
};

const realTestInner = {
    Root: {
        value: "",
        resourcesHash: "local-hash",
        errorsCount: 6,
    },
    "Root/Items": {
        children: ["0"],
    },
    "Root/ItemsWithNesting": {
        children: ["0"],
    },
    "Root/Items/0/Value": {
        value: "456",
        error: [],
    },
    "Root/ItemsWithNesting/0/NestedItems/0/Value": {
        value: "",
        error: ["Поле должно быть заполнено"],
    },
    "Root/ItemsWithNesting/0/NestedItems": {
        children: ["0"],
    },
};

describe("Inner adapter", () => {
    it("Throw error if there are two head nodes", () => {
        expect(() => convertInnerToInnerNode(inputTestInnerWithTwoHeadNodes)).to.throw();
    });
    it("Convert Inner To Inner Node", () => {
        expect(convertInnerToInnerNode(inputTestInner)).to.deep.equal({
            children: [
                {
                    children: [
                        {
                            children: [],
                            name: "С1",
                            viewModel: {
                                value: "0710099",
                            },
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            children: [],
                                            name: "Е1",
                                            viewModel: {
                                                children: [],
                                            },
                                        },
                                    ],
                                    name: "Д1",
                                    viewModel: undefined,
                                },
                                {
                                    children: [
                                        {
                                            children: [],
                                            name: "Ж1",
                                            viewModel: {
                                                error: ["Error Ж1"],
                                            },
                                        },
                                    ],
                                    name: "Д2",
                                    viewModel: undefined,
                                },
                            ],
                            name: "С3",
                            viewModel: undefined,
                        },
                    ],
                    name: "Б1",
                    viewModel: undefined,
                },
                {
                    children: [
                        {
                            children: [],
                            name: "С2",
                            viewModel: {
                                value: "",
                            },
                        },
                    ],
                    name: "Б2",
                    viewModel: undefined,
                },
            ],
            name: "А1",
            viewModel: undefined,
        });
    });
    it("Convert Inner To Inner Node With Multiple", () => {
        expect(convertInnerToInnerNode(testInnerWithMultiple)).to.deep.equal({
            children: [
                {
                    children: [
                        {
                            children: [],
                            name: "С1",
                            viewModel: {
                                value: "0710099",
                            },
                        },
                        {
                            children: [
                                {
                                    children: [],
                                    name: "С2",
                                    viewModel: {
                                        value: "",
                                    },
                                },
                            ],
                            name: "0",
                            viewModel: undefined,
                        },
                        {
                            children: [
                                {
                                    children: [],
                                    name: "С2",
                                    viewModel: {
                                        error: ["Error Ж1"],
                                    },
                                },
                            ],
                            name: "1",
                            viewModel: undefined,
                        },
                    ],
                    name: "Б1",
                    viewModel: undefined,
                },
            ],
            name: "А1",
            viewModel: undefined,
        });
    });
    it("Convert Real Inner To Inner Node", () => {
        expect(convertInnerToInnerNode(realTestInner)).to.deep.equal({
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [],
                                    name: "Value",
                                    viewModel: {
                                        error: [],
                                        value: "456",
                                    },
                                },
                            ],
                            name: "0",
                            viewModel: undefined,
                        },
                    ],
                    name: "Items",
                    viewModel: {
                        children: ["0"],
                    },
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [],
                                                    name: "Value",
                                                    viewModel: {
                                                        error: ["Поле должно быть заполнено"],
                                                        value: "",
                                                    },
                                                },
                                            ],
                                            name: "0",
                                            viewModel: undefined,
                                        },
                                    ],
                                    name: "NestedItems",
                                    viewModel: {
                                        children: ["0"],
                                    },
                                },
                            ],
                            name: "0",
                            viewModel: undefined,
                        },
                    ],
                    name: "ItemsWithNesting",
                    viewModel: {
                        children: ["0"],
                    },
                },
            ],
            name: "Root",
            viewModel: {
                errorsCount: 6,
                resourcesHash: "local-hash",
                value: "",
            },
        });
    });
});
