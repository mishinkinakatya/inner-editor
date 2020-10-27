import { ChangeSet } from "./ChangeSet";
import { Inner } from "./Inner";

export interface ICandyApi {
    getInner(): Promise<Inner>;
    changeInnerNode(changeSet: ChangeSet): Promise<Response>;
}
