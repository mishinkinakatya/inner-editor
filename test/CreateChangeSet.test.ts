import { expect } from "chai";
import { ChangeType, createChangeSet } from "../src/domain/CreateChangeSet";
import { PropertyDescription } from "../src/domain/Inner";

describe("Create Change Set", () => {
    it("Change view model item", () => {
        expect(
            createChangeSet({
                changeType: ChangeType.CHANGED,
                itemName: "value",
                nodeNames: ["A1", "B1", "C1"],
                itemDescription: "PropertyDescription",
            }),
        ).to.deep.equal({
            added: [],
            changed: { "A1/B1/C1.value": "PropertyDescription" },
            removed: [],
        });
    });

    it("Remove view model item", () => {
        expect(
            createChangeSet({
                changeType: ChangeType.REMOVED,
                itemName: "value",
                nodeNames: ["A1", "B1", "C1"],
                itemDescription: "PropertyDescription",
            }),
        ).to.deep.equal({
            added: [],
            changed: {},
            removed: ["A1/B1/C1.value"],
        });
    });
});
