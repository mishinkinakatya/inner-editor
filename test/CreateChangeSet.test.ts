import { expect } from "chai";
import { ChangeType, createChangeSet } from "../src/domain/CreateChangeSet";

describe("Create Change Set", () => {
    it("CreateChangeSet", () => {
        expect(createChangeSet({ type: ChangeType.CHANGED, data: { pathWithProperty: "A1.value", propertyDescription: "currentDescription" }})).to.deep.equal(
            {
                added: [],
                changed: { "A1.value": "currentDescription" },
                removed: [],
            }
        );
    });
});
