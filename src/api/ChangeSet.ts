import { PropertyDescription } from "../domain/Inner";

export interface ChangeSet {
    added: string[];
    changed: { [key: string]: PropertyDescription };
    removed: string[];
}
