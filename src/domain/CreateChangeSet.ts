import { PropertyDescription } from "./Inner";
import { Path } from "./ConverInnerToInnerNode";

export const ChangeType = {
    ADDED: "added",
    CHANGED: "changed",
    REMOVED: "removed",
};

export interface ChangeSet {
    added: string[];
    changed: { [key: string]: PropertyDescription };
    removed: string[];
}

export interface Changes {
    changeType: string;
    itemName: string;
    nodeNames: Path;
    itemDescription?: PropertyDescription;
}

export function createChangeSet({ changeType, itemName, nodeNames, itemDescription }: Changes): ChangeSet {
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
