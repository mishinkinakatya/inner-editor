import { ChangeSet } from "./ChangeSet";
import { Inner } from "./Inner";

export interface ICandyApi {
    changeInnerNode(changeSet: ChangeSet): Promise<Response>;

    getInner(): Promise<Inner>;
}
