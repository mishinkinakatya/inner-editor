import { PropertyDescription } from "./Inner";
import { Path } from "./ConverInnerToInnerNode";
import { ChangeSet } from "../api/ChangeSet";

export enum ChangeType {
    CHANGED = "changed",
    REMOVED = "removed",
}

export interface NodeChanges {
    changeType: string;
    itemName: string;
    nodeNames: Path;
    itemDescription?: PropertyDescription;
}

export function createChangeSet({ changeType, itemName, nodeNames, itemDescription }: NodeChanges): ChangeSet {
    const changeSet = {
        added: [],
        changed: {},
        removed: [] as string[],
    };

    switch (changeType) {
        case ChangeType.CHANGED:
            changeSet.changed = {
                [nodeNames.join("/").concat(".").concat(itemName)]: itemDescription,
            };
            break;
        case ChangeType.REMOVED:
            changeSet.removed = [nodeNames.join("/").concat(".").concat(itemName)];
            break;
    }

    return changeSet;
}
