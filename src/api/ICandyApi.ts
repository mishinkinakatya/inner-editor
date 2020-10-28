import { ChangeSet } from "./ChangeSet";
import { Inner } from "./Inner";

export interface ICandyApi {
    getInner(match): Promise<Inner>;
    changeInnerNode(changeSet: ChangeSet, match): Promise<Response>;
}
