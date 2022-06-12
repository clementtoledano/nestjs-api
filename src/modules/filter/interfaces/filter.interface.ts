import { UnitI } from "../../unit/interfaces/unit.interface";

export interface FilterI {
    id: string;
    name: string;
    createdOn?: Date;
    updatedOn?: Date;
    unit?: UnitI;
}
