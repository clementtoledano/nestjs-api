import { FamilyI } from "../../../core/family/interfaces/family.interface";

export interface CategoryI {
    id: string;
    name: string;
    createdOn?: Date;
    updatedOn?: Date;
    family: FamilyI
}
