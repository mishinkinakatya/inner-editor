import { ChangeSet } from "./ChangeSet";
import { Inner } from "./Inner";

export interface InnerParameters {
    ns: string;
    drafts: string;
}

export interface ICandyApi {
    getInner({ ns, drafts }: InnerParameters): Promise<Inner>;
    changeInnerNode(changeSet: ChangeSet, { ns, drafts }: InnerParameters): Promise<Response>;
}
