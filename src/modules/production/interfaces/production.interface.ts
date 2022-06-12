import { CompanyI } from "../../company/interfaces/company.interface";

export interface ProductionI {
    id: string;
    name: string;
    createdOn?: Date;
    updatedOn?: Date;
    company: CompanyI
}
