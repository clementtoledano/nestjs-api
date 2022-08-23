import { CodeNafI } from "../../../modules/code-naf/interfaces/code-naf.interface";
import { UserI } from "../../../modules/user/interfaces/user.interface";

export interface CompanyI {
    id: string;
    label: string;
    description: string;
    siretNumber: string;
    address: string;
    city: string;
    region: string;
    zipcode: string;
    country: string;
    phone: string;
    email: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    createdOn?: Date;
    updatedOn?: Date;
    user: UserI;
    codeNaf: CodeNafI;
}
