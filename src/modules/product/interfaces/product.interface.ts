import { FamilyI } from "../../family/interfaces/family.interface";

export interface ProductI {
    id: string;
    name: string;
    createdOn?: Date;
    updatedOn?: Date;
    family: FamilyI
}
