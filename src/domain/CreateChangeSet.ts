// export enum ChangeType {
//     added,
//     changed,
//     removed,
// }

import { PropertyDescription } from "./Inner";

export const ChangeType = {
    ADDED: "added",
    CHANGED: "changed",
    REMOVED: "removed",
};

export interface ChangeSet {
    added: string[] | undefined;
    changed: { [key: string]: PropertyDescription } | undefined;
    removed: string[] | undefined;
}

interface ChangesData {
    pathWithProperty: string;
    propertyDescription: string;
}

export interface Changes {
    type: string;
    data: [] | string[] | ChangesData;
}

export function createChangeSet(changes: Changes): ChangeSet {
    const changeSet = {
        added: undefined,
        changed: undefined,
        removed: undefined,
    };

    if (changes.type === ChangeType.CHANGED) {
        const newProp = changes.data.pathWithProperty.toString();
        changeSet.changed.newProp;
        return changeSet;
    } else {
    }
    const chType = changes.type;
    // changeSet[changes.type] = changes.data;

    // return chType;
}
