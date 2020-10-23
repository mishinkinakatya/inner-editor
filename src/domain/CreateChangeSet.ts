import { PropertyDescription } from "./Inner";
import { Path } from "./ConverInnerToInnerNode";
import { ChangeSet } from "../api/ChangeSet";

export enum ChangeType {
    CHANGED = "changed",
    REMOVED = "removed",
}

export interface NodeChanges {
    nodeNames: Path;
    changeType: string;
    itemName: string;
    itemDescription?: PropertyDescription;
}

export function createChangeSet({ nodeNames, changeType, itemName, itemDescription }: NodeChanges): ChangeSet {
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
